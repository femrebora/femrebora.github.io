import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  cp,
  mkdtemp,
  symlink,
  readFile,
  writeFile,
  rm,
  access,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

test(
  'isolated publishing build renders articles and never exposes drafts or future posts',
  { timeout: 120000 },
  async () => {
    const root = resolve('.');
    const fixture = await mkdtemp(join(tmpdir(), 'emre-content-test-'));
    try {
      for (const path of [
        'src',
        'public',
        'astro.config.mjs',
        'tsconfig.json',
        'package.json',
      ]) {
        await cp(join(root, path), join(fixture, path), { recursive: true });
      }
      await symlink(
        join(root, 'node_modules'),
        join(fixture, 'node_modules'),
        'dir',
      );
      const template = await readFile(
        join(root, 'src/content/writing/article-template.md'),
        'utf8',
      );
      const published = template
        .replace(
          'Article template — replace before publishing',
          'QA formatting fixture',
        )
        .replace('draft: true', 'draft: false')
        .replace('2026-10-03', '2020-01-01');
      await writeFile(
        join(fixture, 'src/content/writing/qa-formatting.md'),
        published,
      );
      await writeFile(
        join(fixture, 'src/content/writing/qa-newer.mdx'),
        `---\ntitle: QA MDX fixture\ndescription: Test-only MDX entry\npublishedDate: 2020-02-01\ndraft: false\ncategory: Software\ntags: [QA]\nrelatedProjects: [ecegen]\nreferences:\n  - title: Astro documentation\n    url: https://docs.astro.build/\n---\n\n## MDX content\n\nA test-only expression: {2 + 2}.\n`,
      );
      await writeFile(
        join(fixture, 'src/content/writing/qa-future.md'),
        published
          .replace('QA formatting fixture', 'QA future hidden')
          .replace('2020-01-01', '2999-01-01'),
      );
      const extras = [
        ['qa-c', '2021-03-01', false, 'QA c fixture'],
        ['qa-d', '2021-04-01', false, 'QA d fixture'],
        ['qa-e', '2021-05-01', false, 'QA e fixture'],
        ['qa-featured', '2019-06-01', true, 'QA featured fixture'],
      ];
      for (const [id, date, featured, title] of extras) {
        await writeFile(
          join(fixture, `src/content/writing/${id}.md`),
          `---\ntitle: ${title}\ndescription: Test-only fixture, not an owner article.\npublishedDate: ${date}\ndraft: false\nfeatured: ${featured}\ncategory: Notes\ntags: [QA]\n---\n\nFixture body for ${id}.\n`,
        );
      }
      execFileSync(
        process.execPath,
        [join(root, 'node_modules/astro/bin/astro.mjs'), 'build'],
        {
          cwd: fixture,
          env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
          stdio: 'pipe',
          timeout: 90000,
        },
      );
      const article = await readFile(
        join(fixture, 'dist/blog/qa-formatting/index.html'),
        'utf8',
      );
      for (const expected of [
        '<table>',
        'astro-code',
        'data-footnote',
        'Table of contents',
        'BlogPosting',
        'min read',
        '/blog/qa-newer/',
      ])
        assert.ok(article.includes(expected), `Article missing ${expected}`);
      const mdx = await readFile(
        join(fixture, 'dist/blog/qa-newer/index.html'),
        'utf8',
      );
      for (const expected of [
        'A test-only expression: 4.',
        'Related reading',
        'id="references"',
        '/blog/qa-formatting/',
      ])
        assert.ok(mdx.includes(expected), `MDX missing ${expected}`);
      for (const path of ['blog/index.html', 'rss.xml', 'sitemap-0.xml']) {
        const html = await readFile(join(fixture, 'dist', path), 'utf8');
        assert.ok(
          html.includes('qa-formatting'),
          `${path} missing published article`,
        );
        assert.ok(
          html.includes('qa-featured'),
          `${path} missing featured article`,
        );
        assert.ok(
          !html.includes('qa-future'),
          `${path} exposed scheduled article`,
        );
        assert.ok(!html.includes('article-template'), `${path} exposed draft`);
      }
      const home = await readFile(join(fixture, 'dist/index.html'), 'utf8');
      for (const included of ['qa-featured', 'qa-e', 'qa-d', 'qa-c']) {
        assert.ok(home.includes(included), `homepage missing ${included}`);
      }
      for (const excluded of [
        'qa-formatting',
        'qa-newer',
        'qa-future',
        'article-template',
      ]) {
        assert.ok(!home.includes(excluded), `homepage exposed ${excluded}`);
      }
      assert.ok(
        home.indexOf('id="blog"') < home.indexOf('id="research"'),
        'published homepage should lead with writing',
      );
      const ecegen = await readFile(
        join(fixture, 'dist/work/ecegen/index.html'),
        'utf8',
      );
      for (const phrase of [
        'Source record',
        '49793de',
        'does not imply',
        'Reviewed at commit',
      ]) {
        assert.ok(
          !ecegen.includes(phrase),
          `case study still contains ${phrase}`,
        );
      }
      assert.ok(ecegen.includes('Visit website'));
      assert.ok(ecegen.includes('Source code'));
      const cv = await readFile(join(fixture, 'dist/cv/index.html'), 'utf8');
      assert.ok(
        !/certificate/i.test(cv),
        'empty CV rendered a certificate section',
      );
      assert.ok(!cv.includes('approved for publication'));
      const credentials = await readFile(
        join(fixture, 'dist/credentials/index.html'),
        'utf8',
      );
      assert.ok(credentials.includes('Certificates &amp; training'));
      assert.ok(credentials.includes('href="/cv/"'));
      assert.ok(!credentials.includes('approved and sanitized'));
      assert.ok(!credentials.includes('Verified credentials'));
      await assert.rejects(
        access(join(fixture, 'dist/blog/article-template/index.html')),
      );
      await assert.rejects(
        access(join(fixture, 'dist/blog/qa-future/index.html')),
      );
      // Browser QA uses this isolated artifact; it never enters production dist/.
      await rm(join(root, 'test-results/content-fixture'), {
        recursive: true,
        force: true,
      });
      await cp(
        join(fixture, 'dist'),
        join(root, 'test-results/content-fixture'),
        { recursive: true },
      );
    } finally {
      await rm(fixture, { recursive: true, force: true });
    }
  },
);
