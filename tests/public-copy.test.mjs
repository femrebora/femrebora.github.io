import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

/** Phrases that belong only to the removed ECEGEN source-audit block. */
const ecegenAuditMarkers = [
  'Source record',
  'Reviewed at commit',
  '49793de',
  'does not imply a specific job title',
];

/** Process language that must not return in empty-state interface copy. */
const emptyStateMarkers = [
  'approved and sanitized',
  'unverified documents',
  'Verified credentials',
  'No credentials have been approved',
  'in preparation',
];

const emptyStateFiles = [
  'src/pages/credentials.astro',
  'src/pages/cv.astro',
  'src/pages/about.astro',
  'src/pages/index.astro',
  'src/pages/blog/index.astro',
  'src/components/WritingList.astro',
  'src/components/Footer.astro',
];

function markerHits(source, markers) {
  return markers.filter((phrase) => source.includes(phrase));
}

test('the ECEGEN case study omits the removed audit block', async () => {
  const page = await readFile(
    resolve('src/content/projects/ecegen.md'),
    'utf8',
  );
  assert.deepEqual(markerHits(page, ecegenAuditMarkers), []);
  assert.ok(page.includes('https://www.ecegen.com/'));
  assert.ok(page.includes('https://github.com/ECEGEN/website'));

  const record = await readFile(
    resolve('docs/ecegen-source-record.md'),
    'utf8',
  );
  assert.ok(record.includes('49793deada55e7bef3668042cbd0f4c8ea559cd1'));
  assert.match(record, /Do not copy/i);
});

test('empty-state interface copy does not restore process language', async () => {
  for (const path of emptyStateFiles) {
    const source = await readFile(resolve(path), 'utf8');
    assert.deepEqual(markerHits(source, emptyStateMarkers), [], path);
  }
});

test('an ordinary scientific article may say correlation does not imply causation', async () => {
  const article = await readFile(
    resolve('tests/fixtures/ordinary-article.md'),
    'utf8',
  );
  assert.ok(article.includes('Correlation does not imply causation'));
  assert.ok(
    article.includes('does not imply'),
    'the fixture must contain the ordinary phrase the old vocabulary ban rejected',
  );
  assert.deepEqual(markerHits(article, ecegenAuditMarkers), []);

  const removedAudit = [
    '## Source record',
    'Reviewed at commit 49793deada55e7bef3668042cbd0f4c8ea559cd1.',
    'Employment does not imply a specific job title.',
  ].join('\n');
  const hits = markerHits(removedAudit, ecegenAuditMarkers);
  for (const phrase of ecegenAuditMarkers) {
    assert.ok(hits.includes(phrase), `audit detector missed “${phrase}”`);
  }
});

test('the homepage summary is taken from profile data', async () => {
  const source = await readFile(resolve('src/pages/index.astro'), 'utf8');
  assert.ok(!source.includes('completed July 2026'));
  assert.match(source, /from '\.\.\/data\/profile'/);
  assert.match(source, /\bexperience\b/);
  assert.match(source, /\beducation\b/);
});
