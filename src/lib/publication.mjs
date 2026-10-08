/** A single publication gate shared by every public writing surface. */
export function isPublished(entry, now = new Date()) {
  return (
    !entry.data.draft &&
    (!entry.data.publishedDate || entry.data.publishedDate <= now)
  );
}

/**
 * Homepage writing: one featured article, else the newest, plus up to three
 * other posts. The featured article is not repeated in the remainder.
 * `articles` must already be newest-first.
 */
export function selectHomepageWriting(articles, limit = 4) {
  if (!Array.isArray(articles) || articles.length === 0) return [];
  const cap = Math.max(1, limit);
  const featuredAt = articles.findIndex((article) => article?.data?.featured);
  const leadAt = featuredAt >= 0 ? featuredAt : 0;
  const rest = articles.filter((_, index) => index !== leadAt);
  return [articles[leadAt], ...rest.slice(0, cap - 1)];
}

/** Topics are derived only from the already-published writing collection. */
export function getWritingTopics(articles) {
  const counts = new Map();
  for (const article of articles) {
    for (const tag of new Set(article.data.tags.filter((tag) => tag.trim()))) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  const topics = [...counts].map(([label, count]) => ({
    label,
    count,
    slug:
      label
        .normalize('NFKD')
        .replace(/\p{M}/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || 'topic',
  }));
  const slugCounts = new Map();
  for (const topic of topics) {
    slugCounts.set(topic.slug, (slugCounts.get(topic.slug) ?? 0) + 1);
  }
  // Preserve distinct labels such as C++ and C# without merging their counts.
  for (const topic of topics) {
    if (slugCounts.get(topic.slug) > 1) {
      topic.slug += `-${Array.from(topic.label, (char) => char.codePointAt(0).toString(16)).join('')}`;
    }
  }
  return topics
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'en'))
    .map((topic) => ({ ...topic, href: `/blog/topics/${topic.slug}/` }));
}

/** Approximation for English prose; code and markup are excluded. */
export function readingTime(body = '') {
  const prose = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  return Math.max(
    1,
    Math.ceil(prose.trim().split(/\s+/).filter(Boolean).length / 220),
  );
}
