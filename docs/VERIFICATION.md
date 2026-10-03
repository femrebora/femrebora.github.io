# Verification record

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

## Deployment and content limits

The root-domain Astro configuration and GitHub Actions workflow are ready for review. Publishing still requires the owner to select GitHub Actions in Pages settings and authorize a commit/push. Neither deployment nor settings changes were attempted.

The site has an empty writing feed and no published research thoughts. Following the owner-supplied CV, education, employment, research methods, tools, languages, contact links, and a sanitized downloadable CV are populated. Credentials still require issuer/date details. See `CONTENT-TODO.md`. Research findings and website-specific responsibilities were not invented to fill the layout.
