import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  cp,
  mkdtemp,
  mkdir,
  symlink,
  readFile,
  writeFile,
  rm,
  access,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const ecegenAuditMarkers = [
  'Source record',
  'Reviewed at commit',
  '49793de',
  'does not imply a specific job title',
];

const fixtureCredential = `---
title: QA fixture certificate
issuer: Fixture Institute
date: '2020'
category: training
description: Test-only credential. Not an owner document.
draft: false
featured: false
tags: []
---
`;

test(
  'publishing builds use temporary posts and credentials instead of owner content',
  { timeout: 240000 },
  async () => {
    const root = resolve('.');
    const ownerProfile = await readFile(
      join(root, 'src/data/profile.ts'),
      'utf8',
    );
    const ownerWriting = await readFile(
      join(root, 'src/content/mywritings/article-template.md'),
      'utf8',
    );
    const ownerWritingGuide = await readFile(
      join(root, 'src/content/mywritings/README.md'),
      'utf8',
    );
    const ownerCredential = await readFile(
      join(root, 'src/content/credentials/credential-template.md'),
      'utf8',
    );
    assert.ok(!ownerProfile.includes('QA fixture certificate'));
    assert.ok(!ownerCredential.includes('QA fixture certificate'));

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
        join(root, 'src/content/mywritings/article-template.md'),
        'utf8',
      );
      const ordinary = await readFile(
        join(root, 'tests/fixtures/ordinary-article.md'),
        'utf8',
      );
      const ordinaryBody = ordinary.replace(/^---[\s\S]*?---\s*/, '').trim();
      assert.ok(ordinaryBody.includes('Correlation does not imply causation'));
      const writingDir = join(fixture, 'src/content/mywritings');

      const resetWriting = async () => {
        await rm(writingDir, { recursive: true, force: true });
        await mkdir(writingDir, { recursive: true });
        await writeFile(join(writingDir, 'README.md'), ownerWritingGuide);
        await writeFile(
          join(writingDir, 'article-template.md'),
          template.replace('tags: [Notes]', 'tags: [Draft-only]'),
        );
        await writeFile(
          join(writingDir, 'qa-future.md'),
          template
            .replace(
              'Article template: replace before publishing',
              'QA future hidden',
            )
            .replace('draft: true', 'draft: false')
            .replace('tags: [Notes]', 'tags: [Scheduled-only]')
            .replace('2026-10-03', '2999-01-01'),
        );
      };

      const setCredentials = async (markdown) => {
        const dir = join(fixture, 'src/content/credentials');
        await rm(dir, { recursive: true, force: true });
        await mkdir(dir, { recursive: true });
        await writeFile(
          join(dir, 'credential-template.md'),
          await readFile(
            join(root, 'src/content/credentials/credential-template.md'),
            'utf8',
          ),
        );
        if (markdown) {
          await writeFile(join(dir, 'qa-credential.md'), markdown);
        }
      };

      const build = async () => {
        await rm(join(fixture, 'dist'), { recursive: true, force: true });
        await rm(join(fixture, '.astro'), { recursive: true, force: true });
        try {
          execFileSync(
            process.execPath,
            [join(root, 'node_modules/astro/bin/astro.mjs'), 'build'],
            {
              cwd: fixture,
              env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
              stdio: 'pipe',
              timeout: 70000,
            },
          );
        } catch (error) {
          const stdout = error.stdout?.toString() ?? '';
          const stderr = error.stderr?.toString() ?? '';
          throw new Error(`astro build failed\n${stdout}\n${stderr}`);
        }
      };

      const publish = async (name) => {
        const destination = join(root, 'test-results', name);
        await rm(destination, { recursive: true, force: true });
        await cp(join(fixture, 'dist'), destination, { recursive: true });
      };

      const readDist = (path) => readFile(join(fixture, 'dist', path), 'utf8');

      await resetWriting();
      await setCredentials(null);
      const published = `${template
        .replace(
          'Article template: replace before publishing',
          'QA formatting fixture',
        )
        .replace('draft: true', 'draft: false')
        .replace('2026-10-03', '2020-01-01')
        .trim()}

${ordinaryBody}

## Wide data table

| Identifier | Method | Description |
| :--- | :--- | :--- |
| ${'fixture_identifier_'.repeat(12)} | Test-only method | A wide, unbroken test value. |

\`\`\`bash
python analysis.py --input ${'test_input_'.repeat(18)}
\`\`\`
`;
      await writeFile(join(writingDir, 'qa-formatting.md'), published);
      await writeFile(
        join(writingDir, 'qa-newer.mdx'),
        `---\ntitle: QA MDX fixture\ndescription: Test-only MDX entry\npublishedDate: 2020-02-01\ndraft: false\ncategory: Software\ntags: [QA]\ncanonicalURL: https://example.org/original-mdx/\nrelatedProjects: [ecegen]\nreferences:\n  - title: Astro documentation\n    url: https://docs.astro.build/\n---\n\n## MDX content\n\nA test-only expression: {2 + 2}.\n`,
      );
      for (const [id, date, featured, title] of [
        ['qa-c', '2021-03-01', false, 'QA c fixture'],
        ['qa-d', '2021-04-01', false, 'QA d fixture'],
        ['qa-e', '2021-05-01', false, 'QA e fixture'],
        ['qa-featured', '2019-06-01', true, 'QA featured fixture'],
      ]) {
        await writeFile(
          join(writingDir, `${id}.md`),
          `---\ntitle: ${title}\ndescription: Test-only fixture, not an owner article.\npublishedDate: ${date}\ndraft: false\nfeatured: ${featured}\ncategory: Notes\ntags: [QA]\n---\n\nFixture body for ${id}.\n`,
        );
      }
      await writeFile(
        join(writingDir, 'qa-turkish.md'),
        `---\ntitle: QA Türkçe deneme\ndescription: Test-only Turkish fixture, not an owner article.\npublishedDate: 2018-01-01\ndraft: false\ncategory: Notes\nlanguage: tr\ntags: [QA]\n---\n\nBu bir deneme metnidir. Türkçe karakterler: ğüşiöçİĞÜŞÖÇ.\n`,
      );
      await build();

      const article = await readDist('blog/qa-formatting/index.html');
      for (const expected of [
        '<table>',
        'astro-code',
        'data-footnote',
        'Table of contents',
        'BlogPosting',
        'min read',
        '/blog/qa-newer/',
        'Correlation does not imply causation',
        '<title>QA formatting fixture | F. Emre Bora</title>',
      ])
        assert.ok(article.includes(expected), `Article missing ${expected}`);
      assert.ok(
        !article.includes('\u2014'),
        'article output contains an em dash',
      );
      const turkish = await readDist('blog/qa-turkish/index.html');
      assert.ok(
        turkish.includes('<html lang="tr">'),
        'Turkish post should set the document language',
      );
      assert.ok(
        turkish.includes('Türkçe karakterler'),
        'Turkish characters should render',
      );
      assert.ok(
        turkish.includes('QA Türkçe deneme | F. Emre Bora'),
        'Turkish post title should follow the shared pattern',
      );
      assert.deepEqual(
        ecegenAuditMarkers.filter((phrase) => article.includes(phrase)),
        [],
        'the ordinary causation sentence was treated as the ECEGEN audit block',
      );
      const mdx = await readDist('blog/qa-newer/index.html');
      for (const expected of [
        'A test-only expression: 4.',
        'Related reading',
        'id="references"',
        '/blog/qa-formatting/',
        'https://example.org/original-mdx/',
      ])
        assert.ok(mdx.includes(expected), `MDX missing ${expected}`);
      const archive = await readDist('blog/index.html');
      assert.ok(archive.includes('Search writing'));
      assert.ok(archive.includes('data-search='));
      assert.ok(archive.includes('/blog/topics/qa/'));
      assert.ok(!archive.includes('Scheduled-only'));
      assert.ok(!archive.includes('Draft-only'));
      const topic = await readDist('blog/topics/qa/index.html');
      assert.ok(topic.includes('6 articles in the notebook'));
      assert.ok(topic.includes('/blog/qa-turkish/'));
      assert.ok(!topic.includes('/blog/qa-formatting/'));
      assert.ok(!topic.includes('qa-future'));
      await assert.rejects(
        access(join(fixture, 'dist/blog/topics/scheduled-only/index.html')),
      );
      await assert.rejects(
        access(join(fixture, 'dist/blog/topics/draft-only/index.html')),
      );
      execFileSync(
        process.execPath,
        [join(root, 'scripts/verify-site.mjs'), join(fixture, 'dist')],
        { cwd: root, stdio: 'pipe' },
      );
      for (const path of ['blog/index.html', 'rss.xml', 'sitemap-0.xml']) {
        const html = await readDist(path);
        assert.ok(
          !html.includes('/blog/readme/'),
          `${path} exposed the writing guide`,
        );
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
      const home = await readDist('index.html');
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
        home.includes('id="blog"') &&
          !/Selected research|Selected work|At the desk/.test(home),
        'published homepage should contain writing without professional panels',
      );
      const ecegen = await readDist('work/ecegen/index.html');
      for (const phrase of ecegenAuditMarkers) {
        assert.ok(
          !ecegen.includes(phrase),
          `case study still contains ${phrase}`,
        );
      }
      assert.ok(ecegen.includes('Visit website'));
      assert.ok(ecegen.includes('Source code'));
      const cv = await readDist('cv/index.html');
      assert.ok(
        !cv.includes('Certificates &amp; training'),
        'empty CV rendered a certificate section',
      );
      assert.ok(!cv.includes('QA fixture certificate'));
      assert.ok(!cv.includes('approved for publication'));
      const credentials = await readDist('credentials/index.html');
      assert.ok(credentials.includes('Certificates &amp; training'));
      assert.ok(credentials.includes('href="/cv/"'));
      assert.ok(credentials.includes('No certificates or training records'));
      assert.ok(!credentials.includes('approved and sanitized'));
      assert.ok(!credentials.includes('Verified credentials'));
      assert.ok(!credentials.includes('QA fixture certificate'));
      const about = await readDist('about/index.html');
      assert.ok(!about.includes('Certificates &amp; training'));
      await assert.rejects(
        access(join(fixture, 'dist/blog/article-template/index.html')),
      );
      await assert.rejects(
        access(join(fixture, 'dist/blog/readme/index.html')),
      );
      await assert.rejects(
        access(join(fixture, 'dist/blog/qa-future/index.html')),
      );
      await publish('content-fixture');

      await resetWriting();
      await setCredentials(null);
      await writeFile(
        join(writingDir, 'qa-only.md'),
        `---\ntitle: QA only fixture\ndescription: Test-only fixture, not an owner article.\npublishedDate: 2024-01-01\ndraft: false\nfeatured: false\ncategory: Notes\ntags: [QA]\n---\n\nA single published fixture.\n`,
      );
      await build();
      const oneHome = await readDist('index.html');
      assert.ok(oneHome.includes('/blog/qa-only/'));
      assert.ok(!oneHome.includes('class="post-list"'));
      assert.ok(!oneHome.includes('qa-future'));
      assert.ok(!oneHome.includes('article-template'));
      assert.ok(
        oneHome.includes('id="blog"') &&
          !/Selected research|Selected work|At the desk/.test(oneHome),
        'single-post homepage should contain writing without professional panels',
      );
      const oneBlog = await readDist('blog/index.html');
      assert.ok(oneBlog.includes('/blog/qa-only/'));
      assert.ok(oneBlog.includes('Search writing'));
      assert.ok(!oneBlog.includes('id="category"'));
      assert.ok(!oneBlog.includes('id="tag"'));
      assert.ok(!oneBlog.includes('qa-future'));
      assert.ok(!oneBlog.includes('article-template'));
      assert.ok(
        !(await readDist('cv/index.html')).includes(
          'Certificates &amp; training',
        ),
      );
      for (const path of ['rss.xml', 'sitemap-0.xml']) {
        const html = await readDist(path);
        assert.ok(html.includes('qa-only'), `${path} missing the only post`);
        assert.ok(!html.includes('qa-future'), `${path} exposed a future post`);
        assert.ok(
          !html.includes('article-template'),
          `${path} exposed a draft`,
        );
      }
      await publish('content-fixture-one');

      await resetWriting();
      await setCredentials(fixtureCredential);
      await build();
      const zeroHome = await readDist('index.html');
      assert.ok(
        zeroHome.includes('id="blog"') &&
          !/Selected research|Selected work|At the desk/.test(zeroHome),
        'empty homepage should contain writing without professional panels',
      );
      assert.ok(
        zeroHome.includes('No articles published yet.'),
        'homepage writing empty state should welcome readers',
      );
      assert.ok(!zeroHome.includes('qa-future'));
      assert.ok(!zeroHome.includes('article-template'));
      assert.ok(!zeroHome.includes('/blog/qa-'));
      const zeroBlog = await readDist('blog/index.html');
      assert.ok(zeroBlog.includes('No articles published yet.'));
      assert.ok(!zeroBlog.includes('class="writing-filters"'));
      assert.ok(!zeroBlog.includes('qa-future'));
      assert.ok(!zeroBlog.includes('article-template'));
      for (const path of [
        'cv/index.html',
        'about/index.html',
        'credentials/index.html',
      ]) {
        const html = await readDist(path);
        assert.ok(
          html.includes('QA fixture certificate'),
          `${path} missing the fixture credential`,
        );
        assert.ok(
          html.includes('Fixture Institute'),
          `${path} missing the fixture issuer`,
        );
        assert.ok(!html.includes('approved and sanitized'), path);
      }
      const populatedCredentials = await readDist('credentials/index.html');
      assert.ok(
        !populatedCredentials.includes(
          'No certificates or training records are listed here yet.',
        ),
      );
      for (const path of ['blog/index.html', 'rss.xml', 'sitemap-0.xml']) {
        const html = await readDist(path);
        assert.ok(!html.includes('qa-future'), `${path} exposed a future post`);
        assert.ok(
          !html.includes('article-template'),
          `${path} exposed a draft`,
        );
      }
      await assert.rejects(
        access(join(fixture, 'dist/blog/article-template/index.html')),
      );
      await assert.rejects(
        access(join(fixture, 'dist/blog/qa-future/index.html')),
      );
      await publish('content-fixture-zero');

      assert.equal(
        await readFile(join(root, 'src/data/profile.ts'), 'utf8'),
        ownerProfile,
      );
      assert.equal(
        await readFile(
          join(root, 'src/content/mywritings/article-template.md'),
          'utf8',
        ),
        ownerWriting,
      );
      assert.equal(
        await readFile(
          join(root, 'src/content/credentials/credential-template.md'),
          'utf8',
        ),
        ownerCredential,
      );
    } finally {
      await rm(fixture, { recursive: true, force: true });
    }
  },
);
