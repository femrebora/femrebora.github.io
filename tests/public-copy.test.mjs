import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const banned = [
  'Source record',
  '49793de',
  'approved and sanitized',
  'unverified documents',
  'Verified credentials',
  'in preparation',
  'does not imply',
  'No credentials have been approved',
  'Reviewed at commit',
];

async function filesUnder(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? filesUnder(path) : [path];
    }),
  );
  return nested.flat();
}

test('published source does not carry the removed audit copy', async () => {
  const paths = (
    await Promise.all(
      ['src/pages', 'src/components', 'src/content', 'src/layouts'].map((dir) =>
        filesUnder(resolve(dir)),
      ),
    )
  ).flat();
  for (const path of paths) {
    const source = await readFile(path, 'utf8');
    for (const phrase of banned) {
      assert.ok(!source.includes(phrase), `${path} still contains “${phrase}”`);
    }
  }
});

test('ECEGEN source evidence stays in maintenance docs, off the public page', async () => {
  const page = await readFile(
    resolve('src/content/projects/ecegen.md'),
    'utf8',
  );
  const record = await readFile(
    resolve('docs/ecegen-source-record.md'),
    'utf8',
  );
  assert.ok(page.includes('https://www.ecegen.com/'));
  assert.ok(page.includes('https://github.com/ECEGEN/website'));
  assert.ok(!page.includes('49793de'));
  assert.ok(record.includes('49793deada55e7bef3668042cbd0f4c8ea559cd1'));
  assert.match(record, /Do not copy/i);
});
