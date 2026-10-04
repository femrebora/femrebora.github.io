import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, join, extname, relative } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve(process.argv[2] || 'dist');
const origin = 'https://femrebora.github.io';
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? walk(join(dir, entry.name))
          : join(dir, entry.name),
      ),
    )
  ).flat();
}
const files = await walk(root);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const contents = new Map(
  await Promise.all(
    htmlFiles.map(async (file) => [file, await readFile(file, 'utf8')]),
  ),
);
let checked = 0;
const errors = [];
for (const [file, html] of contents) {
  const page = relative(root, file);
  const pathname = '/' + page.replace(/index\.html$/, '');
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1)
    errors.push(`${page}: expected one h1`);
  for (const required of [
    '<title>',
    'name="description"',
    'rel="canonical"',
    'property="og:image"',
    'application/ld+json',
  ]) {
    if (!html.includes(required)) errors.push(`${page}: missing ${required}`);
  }
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = match[1].replaceAll('&amp;', '&');
    if (/^(mailto:|tel:|data:|javascript:)/.test(raw)) continue;
    const url = new URL(raw, origin + pathname);
    if (url.origin !== origin) continue;
    checked++;
    let target = join(root, decodeURIComponent(url.pathname));
    if (!extname(target)) target = join(target, 'index.html');
    try {
      const info = await stat(target);
      if (!info.isFile()) throw new Error('not a file');
      if (url.hash && target.endsWith('.html')) {
        const targetHtml =
          contents.get(target) || (await readFile(target, 'utf8'));
        const id = decodeURIComponent(url.hash.slice(1));
        if (!targetHtml.includes(`id="${id}"`))
          errors.push(`${page}: missing anchor ${raw}`);
      }
    } catch {
      errors.push(`${page}: missing local target ${raw}`);
    }
  }
}
for (const name of [
  'rss.xml',
  'sitemap-index.xml',
  'sitemap-0.xml',
  'robots.txt',
  '404.html',
  '.nojekyll',
]) {
  try {
    await stat(join(root, name));
  } catch {
    errors.push(`Missing ${name}`);
  }
}
for (const file of files.filter((file) =>
  ['.html', '.xml', '.js'].includes(extname(file)),
)) {
  const source = await readFile(file, 'utf8');
  if (
    source.includes('Article template — replace before publishing') ||
    source.includes('Research note template') ||
    source.includes('Research entry template — replace before publishing') ||
    source.includes('Project template — replace before publishing') ||
    source.includes('Credential template — replace before publishing')
  )
    errors.push(`${relative(root, file)}: unpublished template leaked`);
}
assert.equal(errors.length, 0, errors.join('\n'));
console.log(
  `PASS: ${htmlFiles.length} HTML pages, ${checked} local links/assets/anchors, metadata, feeds, sitemap, 404, and draft exclusion.`,
);
