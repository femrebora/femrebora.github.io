# Verification record

## Local commit validation: 8 October 2026

The owner authorized a local commit using the configured Furkan Emre Bora author and committer identity, without assistant attribution. Before committing, `npm run verify` passed formatting, Astro check (45 files, no diagnostics), all 10 Node tests, the 10-page production build, and verification of 206 local links/assets/anchors plus metadata, sitemap, feed, and draft exclusion. `npm run test:browser` passed all 10 Node tests and all 20 Playwright tests in 40.6 seconds. The separate ECEGEN content edits and website-reference notes remain outside this commit's scope. No remote push, deployment, or account-setting change was performed.

## Medium profile link: 8 October 2026

The owner supplied `https://medium.com/@furkanemrebora`. That account is centralized as `profile.medium` and linked from the masthead, footer, and shared About/CV contact list. The masthead uses a native, decorative Medium icon with a visible label. Person structured data includes the supplied account in `sameAs`. Current profile/contact documentation was updated. No Medium article, embedded content, account integration, or external publication was created; the web tool could not open the external profile, so availability was not claimed from that check.

The existing professional-links browser test now includes Medium and 320px screens, checks the footer destination, and continues to assert that no visible RSS link appears. Its first run exposed a second-row link at the narrowest width. The owning header stylesheet now reduces only icon spacing and horizontal padding at widths up to 360px, keeping visible labels and 44px targets; all four links fit in one row.

`npm run verify` passed formatting, Astro check with no diagnostics, 10 Node tests, a 10-page static build, and the generated-site checks. After the narrow-screen adjustment, rebuilding and output verification passed again with 206 local links/assets/anchors. Seven targeted browser tests passed in 11.9 seconds: all public route widths, light/dark axe checks, no-JavaScript/mobile navigation, CV download, and named profile links at 320, 360, 768, and 1440px. `git diff --check` passed. Changes remain local, uncommitted, and undeployed; the CV PDF and reference repository were not edited.

## Mywritings authoring folder: 8 October 2026

The writing source folder is now `src/content/mywritings/`, with the existing draft `article-template.md` moved intact and a new authoring `README.md`. The guide explains creating one file per weekly post, metadata, draft/featured controls, local preview, validation, updates, and publication through the existing main-branch GitHub Pages workflow. No post was invented or published.

`src/content.config.ts` loads Markdown/MDX from the new base while retaining the `writing` collection name and filename-based article URLs. Its README exclusion keeps authoring instructions out of the content collection and public output. Existing integration fixtures now write posts into the new folder, retain the real guide, and verify the guide never becomes an article or enters archive/feed/sitemap output. Homepage, search, topics, related reading, feeds, draft exclusion, and future-date exclusion use the existing publication helpers.

Current authoring paths were updated in README, design, architecture, maintenance, and content-backlog documentation. Formatting of `docs/website-reference.md` corrected the previous whole-repository formatting blocker; a comparison verified that all wording and table alignment were preserved, with only whitespace and table separators normalized. Other owner content, the CV PDF, dependencies, and deployment configuration were preserved.

`npm run verify` passed in full: formatting, Astro check (45 files, no errors/warnings/hints), all 10 Node tests, a 10-page static build, and 206 local links/assets/anchors plus metadata/publication checks. Seven targeted browser tests passed in 7.7 seconds: long-form Markdown/MDX in both themes, category/topic filtering, zero/one/many homepage states, search/reset/URL state, and topic/article navigation without JavaScript. `git diff --check` passed. The template and guide remain unpublished, and all changes are uncommitted and undeployed.

## Visible RSS removal: 8 October 2026

RSS links were removed from the shared masthead and footer at the owner's request. GitHub, LinkedIn, and Email remain visible; the professional navigation landmark and existing browser assertions now describe those three links. The `/rss.xml` endpoint and HTML feed-discovery metadata remain available. The production build passed, generated-site verification passed 10 HTML pages and 206 local links/assets/anchors, and all four targeted navigation/mobile/CV browser tests passed in 2.4 seconds. The professional-links test checks that no RSS anchor appears at 360, 768, or 1440px. Formatting of the changed files and `git diff --check` passed. Changes remain local, uncommitted, and undeployed.

## Follow-up: writing-only homepage and neutral palette, 8 October 2026

The owner requested a warmer default, rejected pink and a green-tinted background, and asked to keep the homepage for writing only. The current light palette uses neutral warm off-white `#FAF9F6`, white/neutral secondary surfaces, charcoal text, and small sage-green `#496842` accents. The optional dark palette uses neutral charcoal with light sage accents. Light is the default even on a dark-preferring device; stored explicit choices still take precedence. Browser theme-color follows the selected palette. The favicon and social preview were recoloured natively from their existing SVG sources.

The homepage now has a compact introduction, one featured/latest article with up to three other articles, and real published topics. Research, work, biography/contact panels, and marginal background notes were removed from it. Dedicated pages, masthead navigation, professional links, and the CV PDF remain available. Legacy homepage anchors now target corresponding masthead links, while `#blog` remains on the writing section. Removed presentation styles were deleted from their owning stylesheet.

Tests retain zero/one/many article coverage and now assert the writing-only homepage. Professional and academic facts are checked on their dedicated pages. Playwright uses a dedicated static preview on port 4322 so an existing development server's toolbar cannot add shadow-DOM headings to production checks. A test caught insufficient contrast during an animated theme change on native select controls; text and surface colours now switch together immediately, while border/underline/arrow motion remains.

Validation with Node 24.18.0: Astro check passed with no errors, warnings, or hints; all 10 Node tests passed; the production build generated 10 HTML pages; output verification passed 226 local links/assets/anchors and all metadata/publication checks. The final browser run passed all 20 tests in 40.2 seconds, including both palettes, theme persistence/defaults, keyboard and no-JavaScript use, search/no-results/reset, and responsive checks. Formatting of the files changed for this follow-up and `git diff --check` passed. The whole-repository `npm run verify` stopped at formatting of the separately added `docs/website-reference.md`; that unrelated document was left untouched, and every remaining verify step was run and passed separately. Concurrent project-content and masthead-copy edits were preserved.

The real homepage was captured as `test-results/palette-green-option.png` and, with only accent tokens changed inside the review browser, `palette-blue-option.png`. Both use the same neutral warm-white background. Muted blue `#3C6472` is an option preview, not a second production theme; its homepage also passed an axe WCAG A/AA scan. The source currently retains green accents while the owner compares the options. Current production and isolated-fixture screenshots were refreshed at 360, 768, and 1440px in both themes. The actual phone homepage and the populated fixture homepage were visually reviewed. Fixture articles remain test-only and excluded from production.

This follow-up changes homepage/layout styles and tokens, theme initialization/control, the WritingList empty state, native preview assets, existing browser/publication checks, Playwright's preview port, and current design/architecture/maintenance documentation. No dependency, reference-repository, CV PDF, hosting-setting, commit, or deployment change was made. The static local preview is available at `http://127.0.0.1:4322/`.

## Personal publication update: 8 October 2026

The target checkout is `/home/emrebora/Desktop/Dev_Env/femrebora.github.io`, remote `https://github.com/femrebora/femrebora.github.io.git`, branch `main`, starting and final HEAD `72f5946773888fa1a5bf697d37d63f0d7d342899`. Its starting working tree was clean. The read-only reference is `/home/emrebora/Desktop/Dev_Env/taniarascia.com`, remote `https://github.com/taniarascia/taniarascia.com.git`, branch `master`, HEAD `eb61b7f11a2d32dac73db123fd072b9e6a3641e7`; its working tree remained clean. No dependencies were installed and no builds were run there. Its MIT license was inspected; no source code, artwork, personal copy, or article content was reused.

### Design and implementation

The warm publication direction keeps Newsreader, DM Sans, warm paper, deep ink, and forest green. A two-row masthead exposes named GitHub, LinkedIn, Email, and RSS links beside the five primary sections and theme control. A split introduction leads into writing with featured/latest hierarchy, counted static topic links, and compact selected research/work. Writing appears before the supporting biography on mobile; duplicate marginal background copy is hidden there.

Archive search reads the published HTML rows and intersects title/description/tag terms with category and topic selections. It has URL state, an accessible count/selection summary, reset, and no-results feedback. Static topic archives use the same publication helpers and remain available without JavaScript. Article headers align with the 66-character reading column; topics move below the prose; code-copy controls use separate space and announce feedback; tables support horizontal keyboard scrolling.

The production origin is now `https://femrebora.com`, including metadata, structured data, RSS, sitemap, robots, and the re-rendered social card. Syndicated article canonicals remain external when explicitly supplied. Important pages remain indexable; the 404 remains noindex and outside the sitemap.

### Validation

Node.js 24.18.0 was used throughout. The original `npm run verify` passed with 9 tests, no Astro diagnostics, 10 HTML pages, and 232 checked local links/assets/anchors. The original browser suite passed all 16 tests, so there were no baseline failures. Installation and browser/build execution required the environment's approved subprocess access after the sandbox blocked esbuild's binary check; this was resolved, not left as a blocker.

| Command/check                                  | Actual final result                                                                                                                                                                                                                                                      |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm ci --no-audit --no-fund --prefer-offline` | Installed the existing lockfile; package.json and package-lock.json unchanged                                                                                                                                                                                            |
| `npm run verify`                               | Passed formatting, Astro check (44 files, 0 errors/warnings/hints), 10 tests, static build, and site verification                                                                                                                                                        |
| `npm run test:browser`                         | 10 tests passed, then 20 Playwright tests passed in 44.1 seconds                                                                                                                                                                                                         |
| Generated-site check                           | 10 HTML pages and 240 local links/assets/anchors; new-origin metadata/feed/sitemap/robots, punctuation, 404, and draft exclusion passed                                                                                                                                  |
| Responsive and accessibility                   | All public routes fit 320, 360, 375, 768, 1280, and 1440px; axe reports no tested WCAG A/AA violations on public pages, article fixtures, and archive no-results/search controls in both themes                                                                          |
| Authoring/publication fixtures                 | Isolated zero, one, and seven-post builds; featured/newest selection, Markdown/MDX, Turkish language, topic counts/routes, related/previous/next links, explicit external canonical, references, footnotes, wide tables/code, and hidden draft/future-only topics passed |
| Progressive enhancement                        | Ordinary archive/topic/article navigation and TOC links work with JavaScript disabled; theme persistence, blocked storage, reduced motion, skip link, and PDF download passed                                                                                            |
| Code copying                                   | Keyboard activation passes exact code text to a controlled clipboard stub; success feedback and separation from code text verified                                                                                                                                       |
| Final source/output audit                      | `git diff --check` clean; no excluded project names, fixture content, or old production origin in generated output; content, PDF, runtime dependencies, deployment workflow, and repository/domain marker unchanged                                                      |

The first browser pass caught a real reset timing error, which was fixed with an explicit reset handler. A new no-JavaScript navigation check exposed suspended Chromium cross-document transition layers; transitions now activate only when scripting is enabled and motion is preferred. Coverage was retained and expanded, with no forced clicks or disabled checks.

Screenshots were captured at 360, 768, and 1440px in light/dark for Home, Writing, Research, thesis, Work, ECEGEN, About, CV, credentials, article fixtures, and all three article-count states. Production pages were inspected through contact sheets and representative full-page images; article and populated writing screenshots were reviewed directly. A second refinement removed repeated mobile bio copy, put topics immediately after writing, aligned article titles with the reading column, and recaptured article screenshots from the top of the page.

All screenshots and isolated build output are ignored in `test-results/`, never in the production feed, sitemap, search data, or content tree. Useful files: `home-light-1440.png`, `home-dark-360.png`, `home-many-light-360.png`, `archive-many-light-768.png`, `archive-one-dark-360.png`, `article-light-1440.png`, `article-dark-768.png`, and `review-{light,dark}-{360,768,1440}.png`. Article and populated writing images contain test fixtures, not owner publications.

### Changed files by purpose

- **Publication presentation:** `src/components/Header.astro`, `Footer.astro`, `WritingList.astro`, new `WritingTopics.astro`; `src/pages/index.astro`; `src/styles/components/header.css`, `home.css`, `writing.css`; shared `src/styles/tokens.css`, `reset.css`, `layout.css`, `motion.css`, and `prose.css`.
- **Discovery and reading:** `src/lib/content.ts`, `publication.mjs`; `src/pages/blog/index.astro`, `[...slug].astro`, and new `topics/[topic].astro`.
- **Identity and metadata:** `src/data/profile.ts`, `src/layouts/BaseLayout.astro`.
- **Domain and social preview:** `astro.config.mjs`, `public/robots.txt`, `public/social-card.png`, `assets/social-card.svg`, `scripts/verify-site.mjs`.
- **Tests and maintenance:** `tests/publication.test.mjs`, `content-build.test.mjs`, `browser/site.spec.ts`; `README.md`, `docs/DESIGN.md`, `ARCHITECTURE.md`, `MAINTAINING.md`, and this record.

### Local review and hosting boundary

The local development preview was started on `http://127.0.0.1:4321/` and returned HTTP 200. To restart it: `nvm use`, then `npm run dev -- --host 127.0.0.1`. The site still has no published owner articles; all populated-state previews are isolated tests. Add/feature/topic/preview/publish instructions are in `MAINTAINING.md`.

Read-only live checks on 8 October 2026 returned HTTPS apex 200, `www` 301 to HTTPS apex, HTTP apex 200, and old-domain 301 to HTTP apex with the blog path preserved. A nonexistent live path returned HTTP 404. Live homepage canonical, RSS, robots sitemap address, and sitemap index still use the old GitHub origin: the source changes have not been deployed.

Remaining owner actions: review these local changes; authorize publication through the existing GitHub Actions workflow when ready; check Pages custom-domain/Enforce HTTPS settings; confirm the new Search Console property, submit the new sitemap after deployment, and inspect important URLs. The documented `www` CNAME target remains `femrebora.github.io`. No Cloudflare, GitHub account/Pages settings, Search Console, commit, push, merge, or deployment was changed. Local verification and sitemap submission do not guarantee indexing or ranking. Automated scans are not a complete manual accessibility audit.

## Earlier verification records

Verified locally on 3 October 2026 with Node.js 24.18.0 and local Google Chrome. These are local production-build results; GitHub Pages has not been deployed or tested remotely.

## Repository starting state

- Branch: `main`.
- No commits and no tracked website files; initial `git status --short` was empty.
- Remote: `https://github.com/femrebora/femrebora.github.io.git`.
- Existing local agent/tool directories were preserved and excluded from version control.
- No commits, pushes, merges, history rewrites, or GitHub setting changes were performed.

## Initial v1 results

| Check                             | Result                                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `npm ci`                          | Passed: 317 packages installed; lockfile resolves successfully                                                     |
| `npm run format:check`            | All matched files use Prettier formatting                                                                          |
| `npm run check`                   | 0 errors, 0 warnings, 0 hints                                                                                      |
| `npm test`                        | 3 passed, 0 failed                                                                                                 |
| `npm run build`                   | 8 static HTML pages generated, plus RSS, sitemap, assets, robots, and `.nojekyll`                                  |
| `npm run verify:site`             | 8 HTML pages; 161 local links, assets, and anchors checked; no broken targets or template leaks                    |
| `npm run test:browser`            | 9 Playwright tests passed                                                                                          |
| axe accessibility                 | No tested WCAG A/AA violations on all 8 public pages in both themes, or on article fixtures at phone/desktop sizes |
| Responsive checks                 | All 8 pages fit 320, 375, 768, 1280, and 1440px viewports                                                          |
| Local Lighthouse, mobile homepage | Performance 100; accessibility 100; best practices 100; SEO 100                                                    |
| Content exclusion scan            | No excluded project names found in site source, assets, metadata, or documentation                                 |
| `npm audit`                       | 3 high-severity package findings arising from 1 unpatched upstream advisory; see below                             |
| ESLint                            | Not configured; Astro check and Prettier are the chosen source checks                                              |

The Lighthouse mobile run measured FCP and LCP at approximately 1.5 seconds, total blocking time at 0ms, and CLS at 0.001. Scores describe a local simulated run and are not a guarantee of live hosting performance. Automated accessibility scans are not a manual screen-reader audit.

## What the tests cover

The isolated content build uses temporary QA articles outside the source repository. It verifies Markdown tables, footnotes, syntax highlighting, automatic contents lists, MDX expressions, related projects, references, previous/next article navigation, article JSON-LD, and inclusion of approved articles in the homepage, writing index, RSS, and sitemap. Draft and future-dated articles receive no output route. The built QA copy is kept only in ignored `test-results/content-fixture/` for browser tests.

Browser tests cover desktop/phone layouts, both palettes, article reading layouts, filters and empty-result recovery, system-theme changes, explicit theme persistence, keyboard theme control, skip navigation, the CV destination, blocked local storage, reduced motion, and navigation with JavaScript disabled. Desktop and phone screenshots were visually inspected for the homepage and article layout.

Initial verification found and resolved a missing 404 canonical target, slightly insufficient light-theme secondary-text contrast, and low-contrast code comments in the original dark Shiki theme. The code theme now uses `github-dark-high-contrast`. A Lighthouse label-in-name observation was also corrected on the wordmark.

## Environment notes

The shell did not initially include Node in PATH; verification used the installed Node 24 binary from nvm. Astro telemetry was disabled for restricted-directory operation. The isolated build and Chrome tests needed execution outside the filesystem/process sandbox after its child-process restriction produced EPERM. Local preview was bound to `127.0.0.1`. Playwright uses `--ignore-lock` to prevent Astro's agent-aware automatic backgrounding from interrupting its server lifecycle.

## Open dependency finding

`http-cache-semantics` 4.2.0 is affected by [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp); Astro and the MDX integration inherit the audit finding. The advisory lists no patched version. No forced downgrade or unverified override was applied.

The reported issue concerns disclosure from a shared response cache. This site deploys only static files, without an Astro runtime, user sessions, or application response cache. The vulnerable dependency is not shipped to visitors. Keep monitoring the upstream fix; reassess if server rendering or authentication is ever introduced.

## Owner CV update

The owner subsequently supplied `Furkan_Emre_Bora_CV.pdf` (updated September 2026). Its contents were used as biographical source material, not operational instructions. The site now includes the supplied education, experience, tools, languages, email, LinkedIn, and more detailed thesis methods. The A Coruña period is explicitly an Erasmus exchange; no separate completed degree was inferred.

The public PDF is a separate sanitized copy. Phone text and telephone link annotations were removed, the contact header was reflowed, and document metadata was cleaned. The resulting three-page PDF was inspected; text extraction confirms the phone number is absent, there are no telephone links or embedded attachments, and pages 2–3 retain their original text. The supplied source file was not modified or copied into the repository.

Verification after this update: formatting passed; Astro check reported 0 errors, 0 warnings, and 0 hints; all 3 automated tests passed; the production build generated 8 pages; all 153 local link/asset/anchor targets passed; all 9 browser tests passed, including an actual PDF download. Public routes fit all five tested widths and passed automated accessibility checks in both themes. The About page was also visually inspected. Lighthouse scores above refer to the initial v1 run and were not remeasured for this content update.

## Redesign v2 — "Data Atlas" presentation

The owner requested a substantially different UI/UX, then selected the "Data Atlas / Instrument" direction. The presentation layer was rebuilt around a sticky index rail, a cool paper/graphite palette with a single amber signal accent, IBM Plex Sans for interface and headings, Source Serif 4 for long-form reading, and IBM Plex Mono for metadata; the dark theme is a first-class alternative. Research and work are rendered as structured records. The old warm-paper/green palette, Newsreader/DM Sans, serif-heavy headings, notebook motif, sequence figure, numbered sections, and monogram were removed.

Content was not changed and remains the source of truth: `src/data/profile.ts`, the Content Collections, the commit-pinned ECEGEN case study, and the sanitized `public/cv/furkan-emre-bora-cv.pdf` are untouched. The A Coruña period remains an Erasmus exchange, the writing feed remains an honest empty state, and the excluded project names do not appear anywhere in source, output, metadata, or documentation. The favicon and editable `assets/social-card.svg` were restyled to the new system and the 1200×630 `public/social-card.png` was regenerated with the site fonts.

Local verification (Node.js 24.18.0, local Google Chrome):

| Check                  | Result                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| `npm run format:check` | Passed (Prettier)                                                                              |
| `npm run check`        | 0 errors, 0 warnings, 0 hints                                                                  |
| `npm test`             | 3 passed, 0 failed                                                                             |
| `npm run build`        | 8 static pages plus RSS, sitemap, assets, robots, `.nojekyll`                                  |
| `npm run verify:site`  | 8 HTML pages; 163 local links, assets, and anchors; no broken targets or template leaks        |
| `npx playwright test`  | 9 passed, including axe WCAG A/AA scans of all 8 routes in both themes and the article fixture |
| Responsive checks      | All routes fit 320, 375, 768, 1280, and 1440px without horizontal overflow                     |
| CV download            | Actual PDF served and downloaded; filename `furkan-emre-bora-cv.pdf`                           |
| Article layout         | Isolated Markdown/MDX fixture checked in both themes at phone and desktop widths               |

One intended behavior change was required: the homepage hero button is labelled "Explore research" instead of "Research", because the accessible name "Research" collided with the index-rail navigation link. The browser test was left unchanged rather than relaxed. Screenshots of Home, Research, Writing, Work, About, both detail pages, and the 404 page were captured and visually inspected at 390, 768, and 1440px in both themes. No commits, pushes, merges, history rewrites, or GitHub setting changes were performed.

## Refinement pass — 4 October 2026

A polish pass on the "Data Atlas" presentation; the palette base, rail, fonts, and all content are unchanged. `src/data/profile.ts`, the Content Collections, the supplied images, and the public CV were not edited.

- **Navigation:** on phones the name, CV link, and theme control share one row and all five sections fit a second row. Previously the row scrolled sideways and clipped "Work" and "About" at 375px. Ordinal markers were removed from the navigation, which is not a sequence. CV, theme, and navigation targets are 44px on small screens.
- **Introduction and portrait:** one grid on Home and About. The portrait holds the right column beside the name and lede on wide screens and sits beside the name on phones, instead of trailing the buttons. The padded mat was replaced by a hairline frame; the image is never cropped.
- **ECEGEN:** Home and the work index share a `ProjectRecord` component. From 1100px the description, stack, and links sit beside the screenshot; below that they stack. On the project page the boxed facts panel became a ruled row and its links use the shared link style.
- **Type and labels:** tracked uppercase monospace labels became sentence-case IBM Plex Sans. IBM Plex Mono is now limited to dates, tool lists, and code. Body and metadata sizes rose by about one pixel for legibility.
- **Themes:** the dark accent moved from yellow amber `#f2a83b` to copper `#e8a474`, the same hue family as the light theme's rust `#9d4308`.
- **Writing empty state:** the boxed panel with an accent edge became plain text; the redundant "Archive · No issues yet" line was removed.

Local verification (Node.js 24.18.0, Playwright Chromium):

| Check                  | Result                                                                                              |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `npm run verify`       | Prettier, Astro check (0 errors, 0 warnings, 0 hints), 3 Node tests, build of 8 pages, site checker |
| `npm run verify:site`  | 8 HTML pages; 171 local links, assets, and anchors; no broken targets or template leaks             |
| `npm run test:browser` | 11 passed: the 9 existing tests plus phone-navigation fit and touch targets, and image proportions  |
| axe accessibility      | No WCAG A/AA violations on all 8 routes in both themes, or on the article fixture                   |
| Responsive checks      | All routes fit 320, 375, 768, 1280, and 1440px without horizontal overflow                          |

Full-page screenshots of Home, About, Research, the thesis page, Writing, Work, and the ECEGEN page were captured at 375 and 1440px in both themes after every image had loaded and decoded, then inspected. Home at 768px, the work index at 1120px, and a keyboard focus ring on the rail were inspected separately. Lighthouse was not remeasured. No commits, pushes, or deployments were performed.

## Single page and timeline — 4 October 2026

At the owner's request the site was merged into one page for use in PhD and job applications, the layout was widened, and "Writing" was renamed "Blog".

- **Routes:** `/research/`, `/work/`, and `/about/` index pages were removed; their content is now sections of `/`. `/writing/` became `/blog/`. Detail pages for the thesis, the ECEGEN project, and posts remain. The site had been public for minutes when these routes changed, so no redirects were added.
- **Content:** nothing was rewritten or invented. The empty credentials placeholder is no longer shown; the section appears when credentials exist. Timeline entries gained `id`, `short`, `start`, `end`, and `track` fields that restate the existing periods.
- **Timeline:** a genome-browser-style track of education, exchange, research, and work, described in `ARCHITECTURE.md`.
- **Width:** the page widens to 1560px with a pinned title column per section from 1180px.

Local verification (Node.js 24.18.0, Playwright Chromium):

| Check                  | Result                                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `npm run verify`       | Prettier, Astro check (0 errors, 0 warnings, 0 hints), 3 Node tests, build, site checker |
| `npm run verify:site`  | 5 HTML pages; local links, assets, and anchors resolve; no template leaks                |
| `npm run test:browser` | 12 passed, including section tracking and timeline-to-record linking                     |
| axe accessibility      | No WCAG A/AA violations on all 5 routes in both themes, or on the article fixture        |
| Responsive checks      | All routes fit 320, 375, 768, 1280, and 1440px without horizontal overflow               |

Full-page screenshots were inspected at 375, 1440, and 1920px in both themes, with the timeline also checked in its hover state and on a phone.

## Redesign v3 — "Contemporary research journal" — 4 October 2026

At the owner's request the presentation was replaced again, this time with a warm editorial research journal, and the content was spread back out of the single page. The starting point for this pass was commit `16b5cef` ("merge site into a single page with a genome-style timeline") with a clean working tree; the baseline `npm run verify` was green and the site built 5 pages.

Presentation changes: warm paper `#F7F5F0` with a forest-green accent `#185C50`; Newsreader for display and reading, DM Sans for interface, both self-hosted with latin-ext for Turkish; a compact horizontal masthead (`F. Emre Bora | Writing | Research | Work | About | CV`) with a no-JavaScript `<details>` menu on small screens; a designed dark theme. The sticky rail, IBM Plex/Source Serif, the single-page layout, and the rust/copper accent were removed. Three unused font packages were uninstalled and no new runtime dependency was added: Astro 7's default Markdown processor is kept, and article heading links are a small progressive-enhancement script instead of a rehype plugin (which would have required the optional `@astrojs/markdown-remark` package and a deprecated config key).

Information architecture: `/` is now an overview (introduction, writing, research spotlight, ECEGEN work preview, background/contact) that retains the `#research`, `#background`, `#work`, `#blog`, and `#contact` anchors. New pages `/research/`, `/work/`, `/about/`, `/cv/`, and `/credentials/` were introduced; `/blog/` remains the canonical writing index; `/research/trail-resistance/` and `/work/ecegen/` keep their URLs; `/rss.xml` and the sanitized PDF path are unchanged. The personal photograph moved to About; the genome-style timeline moved to About as a secondary feature beside the written lists.

Content was not invented: `src/data/profile.ts` and the collections remain the source of truth, the A Coruña period is still an Erasmus exchange, the writing feed is still an honest empty state, and the excluded project names do not appear in source, output, metadata, or documentation. Structured, owner-verifiable fields (`role`, `question`, `contribution`, `outputs`, project `contribution`, and writing `language`) were added to the schemas so facts live in one place. The ECEGEN contribution text explicitly avoids a job-title or sole-authorship claim, and that gap is recorded in `CONTENT-TODO.md`.

Local verification (Node.js 24.18.0, local Google Chrome):

| Check                  | Result                                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `npm run format:check` | Passed (Prettier)                                                                                                 |
| `npm run check`        | 0 errors, 0 warnings, 0 hints                                                                                     |
| `npm test`             | 3 passed, 0 failed                                                                                                |
| `npm run build`        | 10 static pages plus RSS, sitemap, assets, robots, `.nojekyll`                                                    |
| `npm run verify:site`  | 10 HTML pages; 309 local links, assets, and anchors; no broken targets or template leaks                          |
| `npx playwright test`  | 12 passed, including axe WCAG A/AA scans of all 10 routes in both themes and the article fixture                  |
| Responsive checks      | All routes fit 320, 375, 768, 1280, and 1440px without horizontal overflow                                        |
| No-JavaScript          | Desktop nav and the mobile `<details>` menu reach every page with scripts disabled                                |
| CV download            | Actual PDF served and downloaded; `/cv/` page also offers a print action                                          |
| Article layout         | Isolated Markdown/MDX fixture checked in both themes: TOC, table, code, footnotes, heading links, related reading |

Screenshots were captured by the browser suite for `/`, `/research/`, `/research/trail-resistance/`, `/work/`, `/work/ecegen/`, `/about/`, `/cv/`, `/credentials/`, and `/blog/` at 375, 1440, and 1920px in both themes, then inspected. No commits, pushes, merges, history rewrites, or GitHub setting changes were performed; the changes remain local and uncommitted.

## Deployment and content limits

The root-domain Astro configuration and GitHub Actions workflow are ready for review. Publishing still requires the owner to select GitHub Actions in Pages settings and authorize a commit/push. Neither deployment nor settings changes were attempted.

The site has an empty writing feed and no published research thoughts. Following the owner-supplied CV, education, employment, research methods, tools, languages, contact links, and a sanitized downloadable CV are populated. Credentials still require issuer/date details. See `CONTENT-TODO.md`. Research findings and website-specific responsibilities were not invented to fill the layout.

## Refactor v3 — architecture, design system, and credentials collection (4 October 2026)

The owner requested a senior-level design, frontend-architecture, and maintainability refactor without changing the stack or factual content. Changes: `global.css` (2281 lines) was split into a token-based stylesheet under `src/styles/` with per-owner component files; GenomeTrack styles moved scoped into the component; unused CSS classes and the unused `Timeline.astro` component were removed; the unused Tailwind dependency was removed; credentials moved from `profile.ts` into a `credentials` content collection (one file per credential); research/projects schemas gained `institution`, `period`, `relatedWriting`, `image`, `year`, `status`, `role`; reusable primitives (`PageHeader`, `FeatureSection`, `MetadataList`, `TagList`, `ContactList`, `BackLink`) replaced duplicated markup; the homepage hero now states the focus areas and the research spotlight shows institution/period/role; native cross-document View Transitions (`@view-transition`) replaced full-reload navigation with zero client JavaScript; draft templates were added for research, projects, and credentials with leak checks in the site verifier. The earlier "Data Atlas" presentation described above was superseded before this record; the live design remains the warm-paper research journal.

Local verification (Node.js 24.18.0, local Google Chrome):

| Check                  | Result                                                                     |
| ---------------------- | -------------------------------------------------------------------------- |
| `npm run format:check` | Passed (Prettier)                                                          |
| `npm run check`        | 0 errors, 0 warnings, 0 hints                                              |
| `npm test`             | 8 passed, 0 failed (content-build test now builds a fixture credential md) |
| `npm run build`        | 10 static pages plus RSS, sitemap, assets, robots, `.nojekyll`             |
| `npm run verify:site`  | 10 HTML pages; 225 local links/assets/anchors; no broken targets or leaks  |
| `npm run test:browser` | 16 Playwright tests passed, both themes, five widths                       |

Reduced-motion behavior (including disabled view transitions), no-JavaScript navigation, keyboard use, the article fixture layouts, and the CV PDF download were re-verified by the same suite. No commits, pushes, merges, history rewrites, or GitHub setting changes were performed.
