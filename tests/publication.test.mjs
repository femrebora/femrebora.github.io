import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isPublished,
  readingTime,
  selectHomepageWriting,
  getWritingTopics,
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
test('topics count distinct articles, omit empty labels, and keep colliding labels separate', () => {
  assert.deepEqual(getWritingTopics([]), []);
  const articles = [
    { data: { tags: ['Genomics', 'Genomics', 'C++', 'C#', ''] } },
    { data: { tags: ['Genomics', 'Türkçe', '  '] } },
  ];
  const topics = getWritingTopics(articles);
  assert.equal(topics.length, 4);
  assert.equal(topics[0].label, 'Genomics');
  assert.equal(topics[0].count, 2);
  assert.equal(new Set(topics.map((topic) => topic.href)).size, 4);
  assert.deepEqual(getWritingTopics([...articles].reverse()), topics);
  assert.ok(
    topics.every((topic) => /^\/blog\/topics\/[a-z0-9-]+\/$/.test(topic.href)),
  );
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
