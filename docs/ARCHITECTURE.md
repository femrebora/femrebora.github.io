# Architecture

## Rendering and routing

Astro builds HTML for the single page at `/`, the blog index at `/blog/`, and detail pages under `/research/`, `/work/`, and `/blog/` for approved content. Research, background, selected work, the latest posts, and contact are sections of `/`, addressed as `/#research`, `/#background`, `/#work`, `/#blog`, and `/#contact`. A standalone `404.html` supports GitHub Pages. There are no server endpoints at runtime: `rss.xml.ts` executes at build time. Trailing slashes match directory-based static hosting.

The official sitemap integration receives only generated routes. All detail routes use the same content helpers as their indexes. `isPublished` rejects drafts and future-dated writing before routing or rendering. New content is visible only after a build.

## Content model

| Collection | Purpose                                    | Key additions to common metadata                                                           |
| ---------- | ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| writing    | Articles and essays                        | publishedDate, updatedDate, category, heroImage, canonicalURL, references, relatedProjects |
| research   | Research contexts and outputs              | kind, status, methods, links, order                                                        |
| projects   | Selected technical work                    | category, stack, website, repository, order                                                |
| notes      | Original observations / sourced quotations | discriminated kind; quotations require author, source, locator                             |

Every collection has title, description, draft (defaults to true), featured, and tags. Schemas run at build time. Dates use UTC when rendered. Updated dates cannot precede publication dates. Hero images require nonempty alt text.

`src/data/profile.ts` keeps personal data separate from presentation. Typed arrays hold experience, education, credentials, capabilities, and languages. Biography, education, employment, tools, and contact links come from the owner-supplied September 2026 CV. The Erasmus period is identified as exchange study. The public PDF is a sanitized copy with phone details removed; the original is not stored in the repository. Credentials remain pending because issuer/date details were not supplied. There are no fabricated employers, degrees, dates, credentials, quotes, research findings, or published writing.

The research entry reflects the context supplied by the owner. The ECEGEN entry uses repository evidence pinned to commit `49793deada55e7bef3668042cbd0f4c8ea559cd1`; it distinguishes checked-in deployment configuration from verified live infrastructure.

## Presentation

`BaseLayout` owns the document, metadata, JSON-LD, header, footer, and early theme selection. Components handle reusable content patterns. Route templates compose these components and render Markdown through Astro's `render()`.

CSS tokens define a cool paper background, graphite ink, muted secondary text, and a single warm accent: rust on the light theme and a copper of the same hue family on the dark theme. The dark theme is a first-class alternative with its own surfaces and contrast choices. IBM Plex Sans serves the interface, headings, and labels; Source Serif 4 is reserved for ledes and long-form reading; IBM Plex Mono is limited to dates, tool lists, and code. All fonts are local assets.

The site is built around a sticky index rail: section navigation and an "elsewhere" cluster (CV, GitHub, LinkedIn, contact, RSS, theme) on desktop. Below 900px it becomes a top bar: the name, CV link, and theme control share one row, and all five sections fit a second row without sideways scrolling, each with a 44px touch target. It works without JavaScript. Research and work are presented as structured records (kind, status, methods, stack, links) rather than decorative cards, and there is no decorative sequence figure.

The introduction and portrait share one grid (`.intro`): the portrait holds the right column on wide screens and sits beside the name on phones. `ProjectRecord` renders a project, placing text and screenshot side by side from 1100px and stacking them below that. From 1180px each section pairs a pinned title column with its content, and the page widens to 1560px so large screens are used without stretching text past a readable measure.

`GenomeTrack` draws education, exchange, research, and work as features on one time axis, positioned from the `start` and `end` months in `src/data/profile.ts`. Each feature is a link to its written record in the lists below, so the timeline works without JavaScript; with it, hovering or focusing a feature highlights its record, a readout names it, and a cursor reports the month under the pointer. Labels sit inside a feature when they fit and beside it when they do not. On narrow screens the lanes scroll sideways with the track names pinned. Supplied images are never cropped: frames size to the image's intrinsic proportions, which a browser test asserts.

Article text is limited to 70 characters per line in the reading face, with generous leading, sans-serif hierarchical headings, tables, footnotes, and theme-aware Shiki highlighting. Long code and tables scroll inside the article. The contents list is sticky beside the reading column on larger screens and becomes a normal document section on phones.

## Client JavaScript

Client-side JavaScript is limited to theme control, marking the section in view on the rail, the timeline's hover details, and the blog category/topic filter. There is no framework hydration. The theme is set before first paint, respects system preference until explicitly chosen, persists when local storage is available, and remains functional when storage is blocked. Without JavaScript, CSS respects the system theme and all content/navigation remain usable; inactive controls are hidden.

Filters are progressive enhancement: all published articles are visible without scripts. They never determine publication visibility; filtering drafts happens at build time.

## Accessibility, metadata, and deployment

Semantic landmarks, one h1 per page, visible focus, a skip link, current-page navigation, accessible controls, reduced-motion overrides, and print styles are shared. Pages carry canonical URLs, descriptions, OpenGraph/Twitter metadata, and a local 1200×630 PNG social preview. Articles add BlogPosting data and published/updated timestamps. Person metadata contains only the supplied name and confirmed links.

The social card's editable SVG lives in `assets/`; the PNG is in `public/`. No visitor requests go to external font, analytics, or application services.

Only `dist/` is uploaded by the Astro GitHub Action. PRs validate; authorized future main-branch pushes can deploy. The repository is configured for a user-site root, not a project subdirectory. Node 24 and the lockfile make installations repeatable. TypeScript is constrained to the version range supported by Astro's checker.

## Verification strategy

- Astro check for strict component and TypeScript diagnostics; Prettier for formatting.
- Node tests for publication behavior and reading-time bounds.
- An isolated temporary copy of the site tests actual Markdown/MDX article builds, footnotes, tables, contents lists, previous/next navigation, related work, RSS, sitemap, and draft/future-date exclusion. Test articles never enter the deliverable site.
- A generated-output checker follows every local link, asset, and fragment and verifies metadata and required output files.
- Playwright checks public routes at 320, 375, 768, 1280, and 1440 pixels; axe checks both themes. Additional tests cover keyboard use, persistence, no-JavaScript navigation, blocked storage, reduced motion, phone navigation fit and touch-target size, and image loading and proportions.

Automated checks have practical limits: no remote Pages deployment is exercised locally, no owner credentials are independently attested, and automated accessibility scanning is not a full manual accessibility audit.
