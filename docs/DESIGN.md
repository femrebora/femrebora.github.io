# Design note

The site is a warm editorial "contemporary research journal": a personal home for writing, research, selected work, and a CV that reads as a researcher's publication, not a developer portfolio or startup page.

## Visual system

Tokens live in `src/styles/global.css`.

- **Paper and ink** — warm paper `#F7F5F0`, a near-white secondary surface `#FDFCFA`, deep ink `#1E2523`, secondary text `#555F5B`, and rules `#DDDCD3`.
- **Accent** — a single restrained forest green `#185C50`, used for links, the current-page marker, labels, and small state changes. It is never used as a large fill except buttons.
- **Dark theme** — designed separately with warm near-black surfaces (`#15130F`, `#1E1B15`) and a lightened sage accent `#7FBFA9`, not an inverted light theme. Both themes are checked for text and focus contrast.
- **Type** — Newsreader for expressive headings, ledes, and long-form reading; DM Sans for navigation, labels, meta, and interface text. System monospace is reserved for code. Fonts are self-hosted, latin and latin-ext.
- **Layout** — a centered fluid column around 1180px. Pages use an asymmetric feature grid (a pinned label column beside the content) rather than identical cards, and a comfortable 68-character reading measure for articles.
- **Motion** — short 150–200ms feedback only: hover colour, arrow nudges, and a subtle entrance for career-timeline features. Everything is disabled under `prefers-reduced-motion`.

## Content workflow

All content is Markdown or MDX under `src/content/`, plus personal data in `src/data/profile.ts`. Schemas in `src/content.config.ts` are checked at build time, and `isPublished` keeps drafts and future-dated writing out of every public surface.

To add an article:

1. Copy `src/content/writing/article-template.md` to a descriptive filename such as `my-analysis.md`. The filename becomes `/blog/my-analysis/`.
2. Replace the title, description, publication date, category, tags, and entire body. Set `language:` to `en` or `tr`.
3. Leave `draft: true` while writing; drafts are excluded from pages, listings, RSS, sitemap, and previous/next links.
4. Set `draft: false` only for approved content, then run `npm run verify`.

Longer articles (four or more second-/third-level headings) get a table of contents; section headings get small link anchors. Tables, footnotes, blockquotes, highlighted code, references, related reading, and previous/next links are supported.

To add a credential, add an entry to `credentials` in `src/data/profile.ts` (title, institution, date, description, optional `credentialURL`, optional sanitized `preview`). The credentials page shows an honest empty state until an entry exists. Only sanitized documents belong in `public/`. See [Maintaining the site](MAINTAINING.md) for research, work, and timeline entries, and [the content backlog](CONTENT-TODO.md) for missing owner-supplied material.
