# Maintaining the site

Notes for adding content, publishing, and keeping dependencies in order. The [README](../README.md) covers what the site is and how to run it.

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

See [the content backlog](CONTENT-TODO.md) for missing owner-supplied material.

## GitHub Pages deployment

The site is configured for the **root** of `https://femrebora.github.io`, with no repository `base` path and no custom-domain CNAME.

`.github/workflows/deploy.yml` follows the [official Astro GitHub Pages approach](https://docs.astro.build/en/guides/deploy/github/), running `npm run verify` before uploading the artifact. Pull requests build and verify only. Pushes to `main` and manual workflow runs on `main` can deploy through the `github-pages` environment.

To publish a change:

1. In GitHub → repository Settings → Pages, the source must be **GitHub Actions**. With "Deploy from a branch", GitHub publishes the repository files instead of the built site.
2. Commit and push to `main`, including `package-lock.json` when dependencies change.
3. Check the workflow's build and deployment jobs, then the live URL.

GitHub environment protection rules may require approval before the deployment job runs.

## Dependency advisory

The initial audit reports **3 high-severity package findings from one upstream advisory** in `http-cache-semantics` (inherited by Astro and its MDX integration): [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp). At implementation time the advisory lists no patched version. Do not use `npm audit fix --force`: its suggested downgrade removes the supported Astro stack.

This project emits static files; no Astro server, user session, shared application response cache, or `node_modules` is deployed to GitHub Pages. That makes the reported cross-user shared-cache mechanism inapplicable to the deployed site as designed. The build dependency finding remains open and should be revisited when an upstream patch is available, especially before adding server rendering or authenticated content.
