# Architecture

## Rendering and routing

Astro builds static HTML for a set of pages: the homepage at `/`; indexes at `/research/`, `/work/`, `/blog/`, `/about/`, and `/cv/`; and detail pages under `/research/` and `/work/` plus `/blog/[slug]/`. A standalone `404.html` supports GitHub Pages. There are no server endpoints at runtime: `rss.xml.ts` executes at build time. Trailing slashes match directory-based static hosting.

The homepage is an overview, not the whole site: it introduces the work and links to the dedicated pages. It keeps the legacy anchors `#research`, `#background`, `#work`, `#blog`, and `#contact` so older links still resolve. `/blog/` is the canonical writing index; the navigation label is "Writing". Research and project detail routes keep their existing paths.

The official sitemap integration receives only generated routes. All detail routes use the same content helpers as their indexes. `isPublished` rejects drafts and future-dated writing before routing or rendering. New content is visible only after a build.

## Content model

| Collection | Purpose                                    | Key additions to common metadata                                                                     |
| ---------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| writing    | Articles and essays                        | publishedDate, updatedDate, category, language, heroImage, canonicalURL, references, relatedProjects |
| research   | Research contexts and outputs              | kind, status, methods, links, order, role, question, contribution, outputs                           |
| projects   | Selected technical work                    | category, stack, website, repository, order, contribution                                            |
| notes      | Original observations / sourced quotations | discriminated kind; quotations require author, source, locator                                       |

Every collection has title, description, draft (defaults to true), featured, and tags. Schemas run at build time. Dates use UTC when rendered. Updated dates cannot precede publication dates. Hero images require nonempty alt text. Writing entries carry a `language` field (`en` or `tr`) used for the document `lang`; it defaults to `en` and no empty language switcher is rendered.

`src/data/profile.ts` keeps personal data separate from presentation. Typed arrays hold experience, education, capabilities, and languages. Biography, education, employment, tools, and contact links come from the owner-supplied September 2026 CV. The Erasmus period is identified as exchange study. The public PDF is a sanitized copy with phone details removed; the original is not stored in the repository. There are no fabricated employers, degrees, dates, quotes, research findings, or published writing.

The research entry reflects the context supplied by the owner; its question and contribution fields restate the thesis aim and the documented analysis work, with the cautious "candidates require validation" wording preserved. The ECEGEN entry is limited to the site's public-facing features and avoids claiming sole authorship.

## Presentation

`BaseLayout` owns the document, metadata, JSON-LD, masthead, footer, and early theme selection. Components handle reusable content patterns (post list, records, career timeline, icons). Route templates compose these components and render Markdown through Astro's `render()`.

CSS tokens define a warm paper background (`#F7F5F0`), deep ink, muted secondary text, and a restrained forest-green accent (`#185C50`). The dark theme is designed separately with warm near-black surfaces and a lightened sage accent, not a mechanical inversion. Newsreader serves expressive headings and long-form reading; DM Sans serves navigation, labels, and interface text. Both are local assets with latin and latin-ext subsets, so Turkish renders correctly. There is no external font request.

Navigation is a compact horizontal masthead: wordmark, Writing, Research, Work, About, CV, and a theme control. On small screens the inline nav is hidden and a `<details>` disclosure menu ("Menu") exposes the same links; it opens without JavaScript, and the summary and theme control meet the 44px touch-target minimum. Research and work are presented as structured records and case studies rather than decorative cards.

The homepage is typography-led and asymmetric: an expressive introduction, then a two-column feature grid (a pinned label column beside the content) for Writing, the Research spotlight, Selected work, and Background/Contact. The personal photograph is an About-page element only, not the homepage's dominant visual. `ProjectRecord` places a project's text and screenshot side by side from 1040px and stacks them below that.

`GenomeTrack` draws education, exchange, research, and work as features on one time axis, positioned from the `start` and `end` months in `src/data/profile.ts`. Each feature is a link to its written record in the lists above, so the timeline works without JavaScript; with it, hovering or focusing a feature highlights its record, a readout names it, and a cursor reports the month under the pointer. On narrow screens the lanes scroll sideways with the track names pinned. Supplied images are never cropped: frames size to the image's intrinsic proportions, which a browser test asserts.

Article text is limited to 68 characters per line in the reading face, with generous leading, serif hierarchical headings, tables, footnotes, references, a table of contents, related reading, previous/next navigation, and theme-aware Shiki highlighting. Long code and tables scroll inside the article. The contents list is sticky beside the reading column on larger screens and becomes a normal document section on phones. Section headings receive a small link (`.heading-anchor`) through a tiny progress-enhancement script; the headings keep their `id`s and the contents list works without it.

## Client JavaScript

Client-side JavaScript is limited to theme control, the blog category/topic filter, the career-timeline hover details, the article heading links, and the CV print button. There is no framework hydration. The theme is set before first paint, respects system preference until explicitly chosen, persists when local storage is available, and remains functional when storage is blocked. Without JavaScript, CSS respects the system theme, the mobile menu opens natively, and all content and navigation remain usable; inactive controls are hidden.

Filters are progressive enhancement: all published articles are visible without scripts. They never determine publication visibility; filtering drafts happens at build time.

Markdown is rendered by Astro 7's default processor. The homepage heading-link script is the only reason no rehype plugin is required, which keeps the default processor and the lockfile free of extra Markdown dependencies.

## Accessibility, metadata, and deployment

Semantic landmarks, one h1 per page, visible focus, a skip link, current-page navigation, accessible controls, reduced-motion overrides, and print styles are shared. Pages carry canonical URLs, descriptions, OpenGraph/Twitter metadata, and a local 1200×630 PNG social preview. Articles add BlogPosting data and published/updated timestamps. Person metadata contains only the supplied name and confirmed links.

The social card's editable SVG lives in `assets/`; the PNG is in `public/`. No visitor requests go to external font, analytics, or application services.

Only `dist/` is uploaded by the Astro GitHub Action. PRs validate; authorized future main-branch pushes can deploy. The repository is configured for a user-site root, not a project subdirectory. Node 24 and the lockfile make installations repeatable. TypeScript is constrained to the version range supported by Astro's checker.

## Verification strategy

- Astro check for strict component and TypeScript diagnostics; Prettier for formatting.
- Node tests for publication behavior and reading-time bounds.
- An isolated temporary copy of the site tests actual Markdown/MDX article builds, footnotes, tables, contents lists, previous/next navigation, related reading, RSS, sitemap, and draft/future-date exclusion. Test articles never enter the deliverable site.
- A generated-output checker follows every local link, asset, and fragment and verifies metadata and required output files.
- Playwright checks all public routes at 320, 375, 768, 1280, and 1440 pixels; axe checks both themes. Additional tests cover keyboard use, persistence, no-JavaScript navigation (including the mobile menu), blocked storage, reduced motion, phone menu fit and touch-target size, the career timeline, image loading and proportions, and the article layout.

Automated checks have practical limits: no remote Pages deployment is exercised locally, no owner credentials are independently attested, and automated accessibility scanning is not a full manual accessibility audit.
