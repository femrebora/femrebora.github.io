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
