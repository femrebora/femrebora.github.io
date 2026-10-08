import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, join, extname, relative } from 'node:path';
import assert from 'node:assert/strict';
import {
  decodeEntities,
  findForbiddenPunctuation,
  stripNonProse,
} from './copy-check.mjs';

const root = resolve(process.argv[2] || 'dist');
const origin = 'https://femrebora.com';
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
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const ogURL = html.match(/property="og:url" content="([^"]+)"/)?.[1];
  if (canonical !== ogURL)
    errors.push(`${page}: canonical and Open Graph URL disagree`);
  if (html.includes('https://femrebora.github.io'))
    errors.push(`${page}: old production origin remains`);
  if (page !== '404.html' && /name="robots" content="[^"]*noindex/.test(html))
    errors.push(`${page}: public page unexpectedly has noindex`);
  if (page === '404.html' && !html.includes('content="noindex, follow"'))
    errors.push(`${page}: 404 must remain excluded from indexing`);
  for (const match of html.matchAll(/property="og:image" content="([^"]+)"/g)) {
    if (new URL(decodeEntities(match[1])).origin !== origin)
      errors.push(`${page}: social image must use the production origin`);
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
  for (const finding of findForbiddenPunctuation(stripNonProse(html))) {
    errors.push(`${page}: ${finding} in page copy`);
  }
  for (const match of html.matchAll(
    /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    const graph = JSON.parse(match[1])['@graph'];
    for (const node of graph) {
      if (
        ['Person', 'WebSite'].includes(node['@type']) &&
        new URL(node.url).origin !== origin
      )
        errors.push(`${page}: structured identity uses the wrong origin`);
      if (
        node['@type'] === 'BlogPosting' &&
        node.mainEntityOfPage !== decodeEntities(canonical)
      )
        errors.push(`${page}: article structured canonical disagrees`);
    }
    for (const finding of findForbiddenPunctuation(match[1])) {
      errors.push(`${page}: ${finding} in structured data`);
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
for (const name of ['rss.xml', 'sitemap-0.xml', 'sitemap-index.xml']) {
  const xml = await readFile(join(root, name), 'utf8');
  if (xml.includes('https://femrebora.github.io'))
    errors.push(`${name}: old production origin remains`);
  for (const match of xml.matchAll(
    /<(?:loc|link)>(https?:[^<]+)<\/(?:loc|link)>/g,
  )) {
    if (new URL(decodeEntities(match[1])).origin !== origin)
      errors.push(`${name}: generated link uses the wrong origin`);
  }
  if (name === 'sitemap-0.xml' && xml.includes('/404'))
    errors.push(`${name}: 404 must not appear in the sitemap`);
  for (const finding of findForbiddenPunctuation(
    await readFile(join(root, name), 'utf8'),
  )) {
    errors.push(`${name}: ${finding}`);
  }
}
if (
  !(await readFile(join(root, 'robots.txt'), 'utf8')).includes(
    `${origin}/sitemap-index.xml`,
  )
)
  errors.push('robots.txt: sitemap uses the wrong origin');

/* Required title patterns for the writing-first redesign. */
const titleOf = (page) => {
  const html = contents.get(join(root, page));
  const match = html?.match(/<title>([\s\S]*?)<\/title>/);
  return decodeEntities(match?.[1] ?? '');
};
for (const [page, expected] of [
  ['index.html', 'F. Emre Bora | Writing & Bioinformatics'],
  ['blog/index.html', 'Writing | F. Emre Bora'],
]) {
  const actual = titleOf(page);
  if (actual !== expected)
    errors.push(`${page}: title "${actual}" should be "${expected}"`);
}
for (const file of htmlFiles) {
  const page = relative(root, file);
  if (!page.startsWith('blog/') || page === 'blog/index.html') continue;
  const actual = titleOf(page);
  if (!actual.endsWith('| F. Emre Bora'))
    errors.push(`${page}: title "${actual}" should end with "| F. Emre Bora"`);
}

for (const file of files.filter((file) =>
  ['.html', '.xml', '.js'].includes(extname(file)),
)) {
  const source = await readFile(file, 'utf8');
  if (
    source.includes('Article template: replace before publishing') ||
    source.includes('Research note template')
  )
    errors.push(`${relative(root, file)}: unpublished template leaked`);
}
assert.equal(errors.length, 0, errors.join('\n'));
console.log(
  `PASS: ${htmlFiles.length} HTML pages, ${checked} local links/assets/anchors, metadata, titles, punctuation, feeds, sitemap, 404, and draft exclusion.`,
);
