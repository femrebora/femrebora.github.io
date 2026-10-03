/** A single publication gate shared by every public writing surface. */
export function isPublished(entry, now = new Date()) {
  return (
    !entry.data.draft &&
    (!entry.data.publishedDate || entry.data.publishedDate <= now)
  );
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
