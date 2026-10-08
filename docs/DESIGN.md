# Design note

The site is a warm editorial personal publication, framed as a research notebook: a personal home for writing, research, selected work, and a CV that reads as a researcher's publication, not a developer portfolio or startup page. It should feel like the personal site of a scientist who also builds software.

## Visual system

Tokens live in `src/styles/tokens.css`; see [Architecture](ARCHITECTURE.md) for the full stylesheet map.

- **Paper and ink** — neutral warm off-white `#FAF9F6`, white secondary surfaces, charcoal ink `#292E2B`, secondary text `#49514C`, and muted text `#636A65`. Backgrounds, rules, code, and the writing empty state stay neutral; colour is concentrated in small accents.
- **Accent** — muted sage green `#496842` (`--accent`), with `--accent-hover` and a tinted `--accent-soft` for small state highlights. Used for links, labels, and the current-page marker. The page background has no green or pink wash. The favicon and social preview share the palette.
- **Default and dark theme** — new visitors see light regardless of device preference. The optional dark theme uses charcoal surfaces (`#1C1F1D`, `#252926`), light sage `#B4CF9B`, and its own code background. Explicit selections persist where storage is available; without JavaScript the page stays light. Both themes are contrast-checked by tests.
- **Type** — Newsreader (variable) for expressive headings, ledes, and long-form reading; DM Sans (variable) for navigation, labels, meta, and interface text; system monospace for code. Self-hosted, latin + latin-ext so Turkish renders correctly.
- **Layout**: a centered fluid site column (`--wrap: 1080px`). The homepage has an 880px writing column with a compact introduction, one featured/latest article, up to three other articles, and topic discovery. Research, work, biography, contact panels, and marginal notes are omitted from the homepage; their dedicated pages remain in the masthead. Index pages compose `PageHeader` + `FeatureSection`s with a pinned label column; detail pages use records and metadata grids. Articles read at a 66-character measure (`--prose-measure`) at 20px with a 1.75 line height.
- **Editorial structure**: a double hairline closes the introduction; serif titles, ruled lists, and a quiet tinted writing empty state establish hierarchy. Featured writing has a larger title and summary, with a separate latest list. No article image is required.
- **Space and depth** — quiet borders carry the structure; shadows exist only as tokens (`--shadow`, `--shadow-raised`) for genuinely floating surfaces (the mobile menu). Radii stay small (4–8px): this is print-inspired, not app-like.
- **Scientific voice without cliché** — the genome-browser career track, the method schematic, and record/figure conventions supply the scientific register. No molecules, particles, gradients, or dashboard chrome.

## Navigation and discovery

The masthead has two compact rows. The first holds identity, Writing first in the navigation, Research, Work, About, CV, and the theme control. The second holds a small notebook description and named GitHub, LinkedIn, Medium, and Email icons. Below 800px the native menu contains the five primary destinations; the four professional links remain visible in a separate row with 44px targets. Destinations come from `profile.ts`.

The homepage promotes one featured article, otherwise the newest, with up to three other recent articles. Topic links use real published counts and lead to static lists of matching posts. Empty writing is one honest note with no preparation claims or fabricated article cards.

The archive renders every ordinary article link in HTML. JavaScript adds title/description/tag search, category/topic intersection, a live result count and selected-state summary, URL persistence, reset, and no-results feedback. Controls appear only when usable. Article topics sit after the prose, keeping the title, summary, byline, and dates quiet and prominent. The TOC sits beside the reading column on desktop and above it on narrow screens.

Tania Rascia's site informed approachable identity, scan-friendly writing lists, and topic discovery. Its repository was read only; its MIT license was inspected and no code, personal content, branding, or artwork was reused.

## Public copy punctuation

Public prose and interface copy never uses em dashes, en dashes, or double-hyphen punctuation. Write date ranges with "to" (`Sept 2024 to June 2026`) and use commas, colons, or parentheses instead of dashes. Title patterns are fixed: homepage `F. Emre Bora | Writing & Bioinformatics`, archive `Writing | F. Emre Bora`, article `{title} | F. Emre Bora`. `scripts/copy-check.mjs` scans decoded output after stripping code, styles, SVG, and comments, then runs over every generated page, feed, and structured-data block in `npm run verify:site`, which also asserts the title patterns. CSS custom properties (`--paper`), command flags (`--help`), URLs, hyphens inside compounds, and code are exempt.

## Motion

- **Navigation** uses native cross-document View Transitions: the masthead and wordmark are stable named elements; `main` enters with a 320ms fade-and-rise; article→article and record→record navigation reads as continuous. Unsupported browsers navigate normally.
- **Microinteractions** — 170–280ms border/underline transitions; text and surfaces switch immediately together to preserve contrast during theme changes, arrow nudges on arrow-links and back-links, a scale-and-underline treatment for nav current/hover state, and a 1–2% image scale inside project previews. Nothing translates whole layouts.
- **Reduced motion** — `motion.css` disables all animations, transitions, and view transitions under `prefers-reduced-motion: reduce`, and the timeline feature entrance only runs when motion is preferred.

## Content workflow

All content is Markdown or MDX under `src/content/` (writing, research, projects, credentials, notes), plus personal data in `src/data/profile.ts`. Schemas in `src/content.config.ts` are checked at build time, and `isPublished` keeps drafts and future-dated writing out of every public surface.

To add an article:

1. Copy `src/content/mywritings/article-template.md` to a descriptive filename such as `my-analysis.md`. The filename becomes `/blog/my-analysis/`.
2. Replace the title, description, publication date, category, tags, and entire body. Set `language:` to `en` or `tr`.
3. Set `featured: true` to request the homepage lead. If several entries are featured, the newest featured entry leads; otherwise the newest published entry leads. Assign topics with `tags`, and group the archive with `category`.
4. Leave `draft: true` while writing; drafts are excluded from pages, listings, RSS, sitemap, and previous/next links.
5. Set `draft: false` only for approved content, then run `npm run verify`. The verify step rejects em dashes, en dashes, and double-hyphen punctuation anywhere in the generated public copy.

Longer articles (four or more second-/third-level headings) get a table of contents; section headings get small link anchors. Each code block gets a keyboard-accessible copy control. Figures with captions, tables, footnotes, blockquotes, references, related reading, and previous/next links are supported.

To add a credential, copy `src/content/credentials/credential-template.md`, fill title, issuer, date (owner-supplied facts only), and set `draft: false`. Until a published entry exists, `/cv/` and `/about/` omit the section and `/credentials/` stays available with one neutral sentence and a link to the CV. Only sanitized documents belong in `public/`. Do not restore public copy about approvals, sanitizing, or unverified documents. See [Maintaining the site](MAINTAINING.md) and [the content backlog](CONTENT-TODO.md).
