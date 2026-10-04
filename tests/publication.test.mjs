import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isPublished,
  readingTime,
  selectHomepageWriting,
} from '../src/lib/publication.mjs';

const now = new Date('2026-10-03T12:00:00Z');
test('draft and scheduled content cannot pass the publication gate', () => {
  assert.equal(
    isPublished(
      { data: { draft: true, publishedDate: new Date('2025-01-01') } },
      now,
    ),
    false,
  );
  assert.equal(
    isPublished(
      { data: { draft: false, publishedDate: new Date('2027-01-01') } },
      now,
    ),
    false,
  );
  assert.equal(
    isPublished({ data: { draft: false, publishedDate: now } }, now),
    true,
  );
  assert.equal(isPublished({ data: { draft: false } }, now), true);
});
const post = (id, featured = false) => ({ id, data: { featured } });
test('homepage writing keeps one lead and at most three others', () => {
  assert.deepEqual(selectHomepageWriting([]), []);
  assert.deepEqual(
    selectHomepageWriting([post('only')]).map((entry) => entry.id),
    ['only'],
  );
  const many = [
    post('newest'),
    post('second'),
    post('third'),
    post('fourth'),
    post('fifth'),
    post('oldest', true),
  ];
  assert.deepEqual(
    selectHomepageWriting(many).map((entry) => entry.id),
    ['oldest', 'newest', 'second', 'third'],
  );
  assert.deepEqual(
    selectHomepageWriting(many.slice(0, 5)).map((entry) => entry.id),
    ['newest', 'second', 'third', 'fourth'],
  );
});
test('reading time ignores code and images and has a one-minute minimum', () => {
  assert.equal(readingTime(''), 1);
  assert.equal(readingTime('word '.repeat(441)), 3);
  assert.equal(
    readingTime(
      '```python\n' +
        'code '.repeat(900) +
        '\n```\nA note. ![image](image.webp)',
    ),
    1,
  );
});
