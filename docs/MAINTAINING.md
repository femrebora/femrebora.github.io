# Maintaining the site

Notes for adding content, publishing, and keeping dependencies in order. The [README](../README.md) covers what the site is and how to run it; the [design note](DESIGN.md) covers the visual system.

## Add an article

Copy `src/content/writing/article-template.md` to a descriptive filename such as `my-analysis.md`. The filename becomes `/blog/my-analysis/`.

1. Replace the title, description, publication date, category, tags, and entire body. Set `language:` to `en` or `tr` (it sets the document language).
2. Leave `draft: true` while writing. Drafts are excluded in development **and** production, including detail pages, homepage lists, the writing index, RSS, sitemap, and previous/next links. A draft committed to this public repository remains readable in the source even though the generated site omits it.
3. Preview article typography safely by running the isolated integration test, or intentionally publish the article locally with `draft: false` before building. Restore draft status before sharing the build if the article is not ready.
4. Set `draft: false` only for approved content. Future publication dates are excluded until a new build after that date; GitHub Pages does not run a scheduler.
5. Run `npm run verify`.

The schema supports `updatedDate`, `featured`, `heroImage: { src, alt }`, `canonicalURL`, `references: [{ title, url }]`, and `relatedProjects: [project-slug]`. Categories and tags are free-form. The writing index shows a category or topic control only when published articles offer more than one choice. Use `.mdx` when an article needs Astro-compatible component composition. Only trusted repository authors should contribute MDX, because it can execute build-time code.

The homepage calls `selectHomepageWriting`: one featured article, or the newest if none is featured, plus at most three other posts. The featured article is not repeated in that short list. `/blog/` keeps the full archive. With no published posts, the homepage order is introduction, research, selected work, a short writing introduction, then about and contact. Once posts exist, writing moves ahead of research. Do not invent articles or say that articles are in preparation. Empty writing states are one sentence: the archive does not link to itself or repeat the RSS link. RSS stays in the footer.

Longer articles (four or more second-/third-level headings) receive a table of contents, and section headings receive small link anchors (a small progressive-enhancement script; the headings keep their ids without it). Reading time is an approximate prose word count at 220 words per minute. Tables, footnotes, blockquotes, highlighted fenced code, references, related reading, and previous/next links are supported.

Images in frontmatter use a public path and meaningful alt text. Optimize them before adding them to `public/` (prefer WebP/AVIF). Do not publish confidential data in figures, frontmatter, references, or filenames.

## Add research, notes, work, and credentials

- **Research:** add a Markdown file to `src/content/research/` using the existing entry as a model. Set `draft: false`, `kind`, `status`, `methods`, `order`, and the optional `role`, `question`, `contribution`, and `outputs` fields. `featured: true` promotes the entry to the homepage spotlight. Keep screen-derived candidates framed as unvalidated.
- **Work:** add a Markdown file to `src/content/projects/`; include stack, category, description, links, and a narrow `contribution` grounded in owner-approved facts. `featured: true` promotes the entry to the homepage. Keep commit-level file inventories and deployment caveats in `docs/`, not on the rendered page. The ECEGEN evidence is in [ecegen-source-record.md](ecegen-source-record.md). Do not copy that inventory, a reviewed-at commit, or an authorship disclaimer back into the case study.
- **Notes:** copy the draft in `src/content/notes/`. Original observations use `kind: thought`; sourced quotations require `kind: quotation`, `author`, `source: { title, url }`, and `locator` (page/section). Only published featured notes are rendered. The site launches without an invented personal observation.
- **Timeline:** each entry in `experience` and `education` in `src/data/profile.ts` needs `id`, `short` (the compact timeline name), `start` and `end` as `YYYY-MM` (omit `end` while ongoing), and `track`. Keep them consistent with the displayed `period`. About shows the time axis and a short entry for each period. Put the full descriptions on the CV rather than repeating them around the timeline.
- **Credentials:** add entries to `credentials` in `src/data/profile.ts`: title, institution, date, description, optional `credentialURL`, optional preview `{ src, alt }`. While the array is empty, omit the section on `/cv/` and `/about/`, and do not promote `/credentials/` from the homepage or footer. The route stays available with one neutral sentence and a link to the CV, and the section renders again when an entry is added. Use only owner-supplied, sanitized previews. Do not write public copy about documents being approved, sanitized, or unverified.
- **CV and background:** edit `src/data/profile.ts`; `/cv/` is generated from it, so a single edit updates both the page and the printable HTML CV. Education, employment, tools, languages, email, and LinkedIn are populated from the owner-supplied September 2026 CV. The public copy at `public/cv/furkan-emre-bora-cv.pdf` has the telephone number and telephone links removed. Replace it with an appropriately sanitized copy when updating the CV; keep `profile.cv` in sync. Report any website/PDF discrepancy rather than changing the PDF silently.
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

## Dependency notes

- **Markdown:** Astro 7 renders Markdown with its default processor. The site needs no remark/rehype packages; heading links are added by a small client-side script instead.
- **Fonts:** the only font packages are `@fontsource-variable/newsreader` and `@fontsource-variable/dm-sans`. Each loads its latin and latin-ext subsets from `node_modules` at build time; no font is requested from a CDN at runtime.

The initial audit reports **3 high-severity package findings from one upstream advisory** in `http-cache-semantics` (inherited by Astro and its MDX integration): [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp). At implementation time the advisory lists no patched version. Do not use `npm audit fix --force`: its suggested downgrade removes the supported Astro stack.

This project emits static files; no Astro server, user session, shared application response cache, or `node_modules` is deployed to GitHub Pages. That makes the reported cross-user shared-cache mechanism inapplicable to the deployed site as designed. The build dependency finding remains open and should be revisited when an upstream patch is available, especially before adding server rendering or authenticated content.
