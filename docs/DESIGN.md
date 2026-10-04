# Design note

The site is a warm editorial "contemporary research journal": a personal home for writing, research, selected work, and a CV that reads as a researcher's publication, not a developer portfolio or startup page. It should feel like the personal site of a scientist who also builds software.

## Visual system

Tokens live in `src/styles/tokens.css`; see [Architecture](ARCHITECTURE.md) for the full stylesheet map.

- **Paper and ink** — warm paper `#F7F5F0`, a near-white secondary surface `#FDFCFA`, deep ink `#1E2523`, secondary text `#3C4441`, muted text `#555F5B`, and warm rules `#DCDAD0` / `#C6C3B6`.
- **Accent** — one restrained forest green `#185C50` (`--accent`), with `--accent-hover` and a tinted `--accent-soft` for quiet highlights (timeline features, the mobile menu's current item). Used for links, labels, the current-page marker, and small state changes; never as a large fill except buttons.
- **Dark theme** — designed separately with warm near-black surfaces (`#15130F`, `#1E1B15`), lightened sage accent `#7FBFA9`, and its own code background. Not an inversion of the light theme. Both themes are contrast-checked by tests.
- **Type** — Newsreader (variable) for expressive headings, ledes, and long-form reading; DM Sans (variable) for navigation, labels, meta, and interface text; system monospace for code. Self-hosted, latin + latin-ext so Turkish renders correctly.
- **Layout** — a centered fluid column (`--wrap: 1080px`). The homepage is a writing-first journal: a compact identity band, then a desktop side note beside the main column, where Writing always leads and research and work follow as small selected entries before a quiet About and contact close. Index pages compose `PageHeader` + `FeatureSection`s with a pinned label column; detail pages use records and metadata grids. Articles read at a 66-character measure (`--prose-measure`) at 19px.
- **One editorial gesture** — a small forest-green index square before each homepage section heading. It is the only decoration; everything else is hairlines, type, and spacing.
- **Space and depth** — quiet borders carry the structure; shadows exist only as tokens (`--shadow`, `--shadow-raised`) for genuinely floating surfaces (the mobile menu). Radii stay small (4–8px): this is print-inspired, not app-like.
- **Scientific voice without cliché** — the genome-browser career track, the method schematic, and record/figure conventions supply the scientific register. No molecules, particles, gradients, or dashboard chrome.

## Public copy punctuation

Public prose and interface copy never uses em dashes, en dashes, or double-hyphen punctuation. Write date ranges with "to" (`Sept 2024 to June 2026`) and use commas, colons, or parentheses instead of dashes. Title patterns are fixed: homepage `F. Emre Bora | Writing & Bioinformatics`, archive `Writing | F. Emre Bora`, article `{title} | F. Emre Bora`. `scripts/copy-check.mjs` scans decoded output after stripping code, styles, SVG, and comments, then runs over every generated page, feed, and structured-data block in `npm run verify:site`, which also asserts the title patterns. CSS custom properties (`--paper`), command flags (`--help`), URLs, hyphens inside compounds, and code are exempt.

## Motion

- **Navigation** uses native cross-document View Transitions: the masthead and wordmark are stable named elements; `main` enters with a 320ms fade-and-rise; article→article and record→record navigation reads as continuous. Unsupported browsers navigate normally.
- **Microinteractions** — 170–280ms color/border/underline transitions, arrow nudges on arrow-links and back-links, a scale-and-underline treatment for nav current/hover state, and a 1–2% image scale inside project previews. Nothing translates whole layouts.
- **Reduced motion** — `motion.css` disables all animations, transitions, and view transitions under `prefers-reduced-motion: reduce`, and the timeline feature entrance only runs when motion is preferred.

## Content workflow

All content is Markdown or MDX under `src/content/` (writing, research, projects, credentials, notes), plus personal data in `src/data/profile.ts`. Schemas in `src/content.config.ts` are checked at build time, and `isPublished` keeps drafts and future-dated writing out of every public surface.

To add an article:

1. Copy `src/content/writing/article-template.md` to a descriptive filename such as `my-analysis.md`. The filename becomes `/blog/my-analysis/`.
2. Replace the title, description, publication date, category, tags, and entire body. Set `language:` to `en` or `tr`.
3. Leave `draft: true` while writing; drafts are excluded from pages, listings, RSS, sitemap, and previous/next links.
4. Set `draft: false` only for approved content, then run `npm run verify`. The verify step rejects em dashes, en dashes, and double-hyphen punctuation anywhere in the generated public copy.

Longer articles (four or more second-/third-level headings) get a table of contents; section headings get small link anchors. Each code block gets a keyboard-accessible copy control. Figures with captions, tables, footnotes, blockquotes, references, related reading, and previous/next links are supported.

To add a credential, copy `src/content/credentials/credential-template.md`, fill title, issuer, date (owner-supplied facts only), and set `draft: false`. Until a published entry exists, `/cv/` and `/about/` omit the section and `/credentials/` stays available with one neutral sentence and a link to the CV. Only sanitized documents belong in `public/`. Do not restore public copy about approvals, sanitizing, or unverified documents. See [Maintaining the site](MAINTAINING.md) and [the content backlog](CONTENT-TODO.md).
