/**
 * Public-copy punctuation guard.
 *
 * The owner requires no em dashes, en dashes, or double-hyphen punctuation in
 * public prose or interface copy. Hyphens in real compounds (`read-only`),
 * CSS custom properties (`--paper`), command flags (`--help`), URLs, and code
 * are not prose punctuation and must survive, so checks run on decoded,
 * non-prose-stripped text rather than on raw source.
 */

const NAMED_ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  mdash: '\u2014',
  ndash: '\u2013',
  hellip: '\u2026',
  lsquo: '\u2018',
  rsquo: '\u2019',
  ldquo: '\u201c',
  rdquo: '\u201d',
  middot: '\u00b7',
};

export function decodeEntities(input) {
  return String(input)
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name) => {
      const value = NAMED_ENTITIES[name.toLowerCase()];
      return value === undefined ? match : value;
    });
}

/** Remove code, style, SVG, and comment regions before scanning prose. */
export function stripNonProse(html) {
  return String(html)
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<pre[\s\S]*?<\/pre>/gi, ' ')
    .replace(/<code[\s\S]*?<\/code>/gi, ' ');
}

/**
 * Return a list of forbidden punctuation findings. Double hyphens count only
 * as punctuation, meaning a standalone token such as ` -- ` or `--` at a
 * boundary; `--paper` and `--help` are left alone.
 */
export function findForbiddenPunctuation(text) {
  const decoded = decodeEntities(text).replace(/\s+/g, ' ');
  const findings = [];
  const em = decoded.match(/\u2014/g);
  if (em) findings.push(`em dash (x${em.length})`);
  const en = decoded.match(/\u2013/g);
  if (en) findings.push(`en dash (x${en.length})`);
  const doubleHyphen = decoded.match(/(^|\s)--(?=\s|$)/g);
  if (doubleHyphen) findings.push(`double hyphen (x${doubleHyphen.length})`);
  return findings;
}
