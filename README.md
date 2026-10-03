# F. Emre Bora — personal website

A research-first personal website for **https://femrebora.github.io**. A "data atlas" design system: static HTML, a sticky index rail, local IBM Plex and Source Serif fonts, accessible light/dark themes, and a Markdown/MDX writing platform.

## Local development

Use Node.js 24 and npm. `.nvmrc` selects Node 24 when using nvm.

```sh
nvm use
npm ci
npm run dev
```

Astro serves the site at `http://localhost:4321`. In a restricted environment, set `ASTRO_TELEMETRY_DISABLED=1` to avoid Astro's user-level telemetry configuration write.

```sh
npm run check          # Astro and strict TypeScript diagnostics
npm run format         # Format source and documentation
npm run format:check   # Check formatting
npm test               # Publication rules and isolated article-build integration
npm run build          # Static production output in dist/
npm run verify:site    # Check generated local links, anchors, metadata, and drafts
npm run verify         # All of the above checks, with one production build
npm run preview       # Serve the production build
```

There is no separate ESLint configuration: Astro's checker and Prettier cover this small Astro/TypeScript codebase. No backend, database, authentication, React, analytics, or third-party font requests are included.

### Browser verification

Playwright and axe are development-only dependencies for responsive, accessibility, navigation, and theme checks.

```sh
npx playwright install chromium
npm run build
npm run test:browser
```

Alternatively, use an existing Chrome installation:

```sh
CHROME_PATH=/usr/bin/google-chrome npm run test:browser
```

The test command first builds an isolated article fixture, then the runner starts the production preview itself. Screenshots and the isolated fixture are saved to ignored `test-results/`. These browser checks are separate from the normal CI build; automated accessibility checks do not replace manual assistive-technology testing.

## Stack and structure

- Astro 7, strict TypeScript, Tailwind CSS v4 through its Vite plugin.
- Astro Content Collections with runtime schemas; Markdown and MDX.
- Self-hosted IBM Plex Sans, Source Serif 4, and IBM Plex Mono, with Shiki code highlighting.
- Official Astro RSS, sitemap, and MDX integrations.
- GitHub Actions using Astro's maintained deployment action.

```text
src/
  components/          Index-rail navigation, section headings, records, timeline, notes, icons
  content/
    writing/           Articles (the supplied template stays draft-only)
    research/          Research entries and future research outputs
    projects/          Selected work and repository-sourced case studies
    notes/             Original observations or sourced quotations
  content.config.ts    Collection schemas
  data/profile.ts      Biography, links, education, experience, capabilities, credentials
  layouts/             Shared document, SEO, and themes
  lib/                 Content querying, publication gate, reading time
  pages/               Static index and detail routes, RSS, 404
  styles/              Design tokens, typography, responsive and print styles
assets/                Editable source for the social preview
public/                Favicon, social preview PNG, robots.txt, .nojekyll
scripts/               Generated-site verification
tests/                 Publication and browser checks
docs/                  Architecture, content backlog, verification record
```

## Add an article

Copy `src/content/writing/article-template.md` to a descriptive filename such as `my-analysis.md`. The filename becomes `/writing/my-analysis/`.

1. Replace the title, description, publication date, category, tags, and entire body.
2. Leave `draft: true` while writing. Drafts are excluded in development **and** production, including detail pages, homepage lists, RSS, sitemap, and previous/next links.
3. Preview article typography safely by running the isolated integration test, or intentionally publish the article locally with `draft: false` before building. Restore draft status before sharing the build if the article is not ready.
4. Set `draft: false` only for approved content. Future publication dates are excluded until a new build after that date; GitHub Pages does not run a scheduler.
5. Run `npm run verify`.

The schema supports `updatedDate`, `featured`, `heroImage: { src, alt }`, `canonicalURL`, `references: [{ title, url }]`, and `relatedProjects: [project-slug]`. Categories and tags are free-form; the writing index exposes filters only when articles exist. Use `.mdx` when an article needs Astro-compatible component composition. Only trusted repository authors should contribute MDX, because it can execute build-time code.

Longer articles (four or more second-/third-level headings) receive a table of contents. Reading time is an approximate prose word count at 220 words per minute. Tables, footnotes, blockquotes, highlighted fenced code, references, and previous/next links are supported.

Images in frontmatter use a public path and meaningful alt text. Optimize them before adding them to `public/` (prefer WebP/AVIF). Do not publish confidential data in figures, frontmatter, references, or filenames.

## Add research, notes, and credentials

- **Research:** add a Markdown file to `src/content/research/` using the existing entry as a model. Set `draft: false`, `kind`, `status`, `methods`, and `order`. Available kinds include thesis, publication, poster, presentation, dataset, and software. `featured: true` adds the entry to the homepage.
- **Work:** add a Markdown file to `src/content/projects/`; include verified stack, category, description, and links. Use commit-pinned source links for factual claims.
- **Notes:** copy the draft in `src/content/notes/`. Original observations use `kind: thought`; sourced quotations require `kind: quotation`, `author`, `source: { title, url }`, and `locator` (page/section). Only published featured notes are rendered. The site launches without an invented personal observation.
- **CV and background:** edit `src/data/profile.ts`. Education, employment, tools, languages, email, and LinkedIn are populated from the owner-supplied September 2026 CV. The public copy at `public/cv/furkan-emre-bora-cv.pdf` has the telephone number and telephone links removed. Replace it with an appropriately sanitized copy when updating the CV; keep `profile.cv` in sync.
- **Credentials:** add entries to `credentials` in `src/data/profile.ts`: title, institution, date, description, optional credentialURL, optional preview `{ src, alt }`. Use only approved, sanitized previews. Remove signatures, identification numbers, serial numbers, private QR codes, addresses, and unnecessary personal information before placing anything in `public/`.
- **Contact:** set `profile.linkedin` and `profile.email` to confirmed public values. Empty values are never turned into fabricated links.

See [the content backlog](docs/CONTENT-TODO.md) for missing owner-supplied material.

## GitHub Pages deployment

The site is configured for the **root** of `https://femrebora.github.io`, with no repository `base` path and no custom-domain CNAME.

`.github/workflows/deploy.yml` follows the [official Astro GitHub Pages approach](https://docs.astro.build/en/guides/deploy/github/), running `npm run verify` before uploading the artifact. Pull requests build and verify only. Pushes to `main` and manual workflow runs on `main` can deploy through the `github-pages` environment.

Deployment has **not** been executed. Once you choose to publish:

1. Review the content and pending items.
2. In GitHub → repository Settings → Pages, select **GitHub Actions** as the source.
3. Commit and push the reviewed files, including `package-lock.json`, to `main`.
4. Check the workflow's build and deployment jobs and then the live URL.

No repository settings were changed during implementation. If Pages isn't enabled, the deployment job will need that setting before it can finish. GitHub environment protection rules may also require approval.

## Dependency advisory

The initial audit reports **3 high-severity package findings from one upstream advisory** in `http-cache-semantics` (inherited by Astro and its MDX integration): [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp). At implementation time the advisory lists no patched version. Do not use `npm audit fix --force`: its suggested downgrade removes the supported Astro stack.

This project emits static files; no Astro server, user session, shared application response cache, or `node_modules` is deployed to GitHub Pages. That makes the reported cross-user shared-cache mechanism inapplicable to the deployed site as designed. The build dependency finding remains open and should be revisited when an upstream patch is available, especially before adding server rendering or authenticated content.

See [architecture](docs/ARCHITECTURE.md) and [verification](docs/VERIFICATION.md) for implementation and check details.
