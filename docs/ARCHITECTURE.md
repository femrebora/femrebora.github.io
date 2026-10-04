# Architecture

## Rendering and routing

Astro builds static HTML: the homepage at `/`; indexes at `/research/`, `/work/`, `/blog/`, `/about/`, `/cv/`, and `/credentials/`; detail pages under `/research/` and `/work/` plus `/blog/[slug]/`; and a standalone `404.html` for GitHub Pages. There are no server endpoints at runtime: `rss.xml.ts` executes at build time. Trailing slashes match directory-based static hosting.

The homepage is an overview, not the whole site. It keeps the legacy anchors `#research`, `#background`, `#work`, `#blog`, and `#contact` so older links resolve. `/blog/` is the canonical writing index; the navigation label is "Writing". Research and project detail routes keep their existing paths.

The official sitemap integration receives only generated routes. All detail routes use the same content helpers as their indexes. `isPublished` rejects drafts and future-dated writing before routing or rendering. New content is visible only after a build.

## Content model

| Collection  | Purpose                                    | Notable fields                                                                                                         |
| ----------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| writing     | Articles and essays                        | publishedDate, updatedDate, category, language, heroImage, canonicalURL, references, relatedProjects                   |
| research    | Research contexts and outputs              | kind, status, institution, period, methods, links, order, role, question, contribution, outputs, relatedWriting, image |
| projects    | Selected technical work                    | category, year, status, role, stack, website, repository, order, contribution, image                                   |
| credentials | Certificates, training, awards, workshops  | issuer, date, category, credentialId, credentialUrl, image, description                                                |
| notes       | Original observations / sourced quotations | discriminated kind; quotations require author, source, locator                                                         |

Every collection has title, description, `draft` (defaults to `true`), `featured`, and `tags`. Schemas run at build time. Dates use UTC when rendered; updated dates cannot precede publication dates; hero images require nonempty alt text. Writing entries carry `language` (`en`/`tr`) used for the document `lang`. Draft templates exist for writing, research, projects, and credentials: copy one, replace every field, set `draft: false`.

`src/data/profile.ts` keeps personal data separate from presentation: identity, tagline, biography, contact links, experience and education timeline entries (with `start`/`end` months that drive the GenomeTrack), capabilities, languages. The Erasmus period is identified as exchange study, never as a second degree. Credentials live in the credentials collection and stay unpublished until owner-supplied issuer and date details exist; an empty output omits the section on the CV and About page. Nothing factual is invented anywhere.

The research entry reflects owner-supplied context. Its `question` and `contribution` restate the thesis aim and the documented analysis work; the pages keep the distinction between candidate prioritization and experimental validation. The ECEGEN case study describes the website, a narrow supported contribution, and the technology; the commit-level inventory stays in `docs/ecegen-source-record.md` and must not be rendered.

## Presentation

`BaseLayout` owns the document, metadata, JSON-LD, masthead, footer, and pre-paint theme selection. Reusable primitives (`PageHeader`, `FeatureSection`, `MetadataList`, `TagList`, `ContactList`, `BackLink`) give indexes and detail pages one consistent structure; content-pattern components (`WritingList`, `ProjectRecord`, `ProjectPreview`, `MethodSchematic`, `GenomeTrack`, `ProfilePhoto`, `Icon`, `ResearchNotes`) render specific data shapes. Route templates compose these and render Markdown through Astro's `render()`.

### CSS architecture

`src/styles/global.css` is an import chain; ownership is by file:

```text
src/styles/
  global.css          import order (the only file BaseLayout imports)
  fonts.css           self-hosted variable fonts (latin + latin-ext)
  tokens.css          design tokens: color themes, motion, layout, z
  reset.css           element defaults, focus, skip-link guarantees
  base.css            site shell, text primitives (.label/.meta/.lede), footer
  primitives.css      .button, .link-arrow, .tag-list
  layout.css          .page-head, feature grid, records, .record-bar, detail scaffolding
  prose.css           .prose long-form reading surface + Shiki theming
  components/
    header.css        masthead, navigation, disclosure menu, theme control
    home.css          hero, research spotlight, method schematic, work/writing/close sections
    writing.css       archive list, featured post, filters, article layout, TOC
    work.css          project records and previews
    about.css         narrative, milestones, interest lists, notes
    credentials.css   credential records
    cv.css            CV page
  motion.css          view transitions, microinteractions, reduced motion
  print.css           print targets (CV, articles)
```

Component-owned styles live in the component: GenomeTrack's track styles are scoped inside `GenomeTrack.astro`. New page styles belong in the owning file under `components/`, not in a new global block. Tokens (spacing, motion timing, z-index, shadows, radii) come from `tokens.css` — avoid magic values in new rules.

There is no Tailwind: the site is deliberately custom CSS, and the unused dependency was removed.

### Motion and view transitions

Navigation uses the browser's native **cross-document View Transitions** (`@view-transition { navigation: auto; }` in `motion.css`). This is a zero-JavaScript, CSS-only enhancement: the masthead and wordmark are named elements (`view-transition-name`), so they hold still while `main` enters with a 320ms fade-and-rise. Browsers without support navigate normally. Because there is no client-side router, every page is a full document — all existing scripts (theme, filters, timeline, heading anchors) keep running exactly as before, and `prefers-reduced-motion: reduce` disables every transition and animation.

### Client JavaScript

Client-side JavaScript is limited to theme control, the blog category/topic filter, the career-timeline hover details, article heading anchors, and the CV print button. No framework hydration. The theme is set before first paint, respects system preference until explicitly chosen, persists when local storage is available, and works when storage is blocked. Without JavaScript: CSS respects the system theme, the mobile menu opens natively (`<details>`), all content and navigation remain usable, and inactive controls stay hidden.

## Accessibility, metadata, and deployment

Semantic landmarks, one h1 per page, visible focus, a skip link, current-page navigation, accessible controls, reduced-motion overrides, and print styles are shared. Pages carry canonical URLs, descriptions, OpenGraph/Twitter metadata, and a local 1200×630 PNG social preview. Articles add BlogPosting data and published/updated timestamps. Person metadata contains only the supplied name and confirmed links. No visitor request goes to external font, analytics, or application services.

Only `dist/` is uploaded by the Astro GitHub Action. PRs validate; authorized main-branch pushes deploy. Node 24 and the lockfile make installations repeatable.

## Verification strategy

- Astro check for strict component/TypeScript diagnostics; Prettier for formatting.
- Node tests for publication behavior, reading time, and public copy.
- An isolated temporary copy of the site builds real Markdown/MDX articles, footnotes, tables, TOCs, previous/next navigation, related reading, a credential, RSS, sitemap, and draft/future-date exclusion. Test content never enters the deliverable site.
- A generated-output checker follows every local link, asset, and fragment; verifies metadata, required output files; and asserts draft templates never leak.
- Playwright checks all public routes at 320, 375, 768, 1280, and 1440 pixels; axe checks both themes. Additional tests cover keyboard use, persistence, no-JavaScript navigation, blocked storage, reduced motion, the career timeline, image proportions, and the article layout.

Automated checks have practical limits: no remote Pages deployment is exercised locally, and automated scanning is not a full manual accessibility audit.
