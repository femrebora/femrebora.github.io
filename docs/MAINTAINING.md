# Maintaining the site

Notes for adding content, publishing, and keeping dependencies in order. The [README](../README.md) covers what the site is and how to run it; the [design note](DESIGN.md) covers the visual system; [architecture](ARCHITECTURE.md) covers rendering, the CSS map, and motion.

## Add an article

Copy `src/content/writing/article-template.md` to a descriptive filename such as `my-analysis.md`. The filename becomes `/blog/my-analysis/`.

1. Replace the title, description, publication date, category, tags, and entire body. Set `language:` to `en` or `tr` (it sets the document language).
2. Leave `draft: true` while writing. Drafts are excluded in development **and** production, including detail pages, homepage lists, the writing index, RSS, sitemap, and previous/next links. A draft committed to this public repository remains readable in the source even though the generated site omits it.
3. Preview article typography safely by running the isolated integration test, or intentionally publish the article locally with `draft: false` before building. Restore draft status before sharing the build if the article is not ready.
4. Set `draft: false` only for approved content. Future publication dates are excluded until a new build after that date; GitHub Pages does not run a scheduler.
5. Run `npm run verify`.

The schema supports `updatedDate`, `featured`, `heroImage: { src, alt }`, `canonicalURL`, `references: [{ title, url }]`, and `relatedProjects: [project-slug]`. Categories and tags are free-form. The writing index shows a category or topic control only when published articles offer more than one choice. Use `.mdx` when an article needs Astro-compatible component composition (trusted repository authors only: MDX executes build-time code).

The homepage calls `selectHomepageWriting`: one featured article, or the newest if none is featured, plus at most three other posts. The featured article is not repeated in that short list. `/blog/` keeps the full archive. With no published posts, the homepage order is introduction, research, selected work, a short writing introduction, then about and contact; once posts exist, writing moves ahead of research. Do not invent articles or claim articles are in preparation. Empty writing states are one sentence. RSS stays in the footer.

Longer articles (four or more second-/third-level headings) receive a table of contents, and section headings receive small link anchors (a progressive-enhancement script; the headings keep their ids without it). Reading time is an approximate prose word count at 220 words per minute.

Images in frontmatter use a public path and meaningful alt text. Optimize before adding to `public/` (prefer WebP/AVIF). Never publish confidential data in figures, frontmatter, references, or filenames.

## Add research, projects, credentials, and notes

Each addition is **one Markdown file** in its collection. Copy the collection's template, replace every field, set `draft: false`, run `npm run verify`.

- **Research:** copy `src/content/research/research-template.md` (or use the published thesis entry as a model). `kind`, `status`, `order` are required; `institution`, `period`, `role`, `question`, `contribution`, `methods`, `outputs`, `links`, `relatedWriting`, `image`, and `tags` are optional but supported — the detail page and homepage spotlight render them when present. `relatedWriting` takes writing slugs and renders a "Related writing" list on the research page. `featured: true` promotes the entry to the homepage spotlight. Keep screen-derived candidates framed as unvalidated.
- **Work:** copy `src/content/projects/project-template.md`. Include stack, category, description, links, and a narrow `contribution` grounded in owner-approved facts. Optional `year`, `status`, and `role` render in the record header and detail page. `featured: true` promotes the entry to the homepage. Keep commit-level file inventories and deployment caveats in `docs/`, not on the rendered page. The ECEGEN evidence is in [ecegen-source-record.md](ecegen-source-record.md); do not copy that inventory, a reviewed-at commit, or an authorship disclaimer back into the case study.
- **Credentials:** copy `src/content/credentials/credential-template.md`. `title`, `issuer`, and `date` are required and must be owner-supplied. Optional `category` (certificate/training/award/workshop/professional), `credentialId`, `credentialUrl`, `image: { src, alt }`, `description`, and body text. Until a published entry exists, omit the section on `/cv/` and `/about/`; `/credentials/` stays available with one neutral sentence and a link to the CV. Use only owner-supplied, sanitized previews. Do not write public copy about documents being approved, sanitized, or unverified.
- **Notes:** copy the draft in `src/content/notes/`. Original observations use `kind: thought`; sourced quotations require `kind: quotation`, `author`, `source: { title, url }`, and `locator` (page/section). Only published featured notes render ("From the reading desk" on `/research/`). The site launches without an invented personal observation.
- **Timeline:** each entry in `experience` and `education` in `src/data/profile.ts` needs `id`, `short` (the compact timeline name), `start` and `end` as `YYYY-MM` (omit `end` while ongoing), and `track`. Keep them consistent with the displayed `period`. About shows the time axis and a short entry for each period; put full descriptions on the CV.
- **CV and background:** edit `src/data/profile.ts`; `/cv/` is generated from it, so a single edit updates both the page and the printable HTML CV. The homepage about line uses the current `work` entry with no `end` and the latest `education` entry. Education, employment, tools, languages, email, and LinkedIn are populated from the owner-supplied September 2026 CV. The public copy at `public/cv/furkan-emre-bora-cv.pdf` has the telephone number and telephone links removed. Replace it with an appropriately sanitized copy when updating the CV; keep `profile.cv` in sync. Report any website/PDF discrepancy rather than changing the PDF silently.
- **Contact:** set `profile.linkedin` and `profile.email` to confirmed public values. Empty values are never turned into fabricated links.

See [the content backlog](CONTENT-TODO.md) for missing owner-supplied material.

## CSS and components

New styles belong to the file that owns the selector (see the map in [architecture](ARCHITECTURE.md)); page-specific rules go in `components/<page>.css`, component-owned rules go scoped in the `.astro` file. Use tokens from `tokens.css` (motion timing, z-index, shadows, radii, widths) instead of magic values. There is no Tailwind; do not reintroduce utility-class styling casually. Keep selectors flat and specific by ownership, not by `!important` or nesting depth.

## GitHub Pages deployment

The site is configured for the **root** of `https://femrebora.github.io`, with no repository `base` path and no custom-domain CNAME.

1. In GitHub → repository Settings → Pages, the source must be **GitHub Actions**. With "Deploy from a branch", GitHub publishes the repository files instead of the built site.
2. Commit and push to `main`, including `package-lock.json` when dependencies change.
3. Check the workflow's build and deployment jobs, then the live URL.

`.github/workflows/deploy.yml` follows the official Astro GitHub Pages approach, running `npm run verify` before uploading. Pull requests build and verify only. Pushes to `main` and manual workflow runs on `main` can deploy through the `github-pages` environment; environment protection rules may require approval.

## Dependency notes

- **Markdown:** Astro 7 renders Markdown with its default processor. The site needs no remark/rehype packages; heading links are added by a small client-side script instead.
- **Fonts:** the only font packages are `@fontsource-variable/newsreader` and `@fontsource-variable/dm-sans`. Each loads its latin and latin-ext subsets from `node_modules` at build time; no font is requested from a CDN at runtime.
- **CSS:** no Tailwind or utility framework. The dependency was removed after the refactor confirmed zero usage; all styling is the tokenized custom CSS described in [architecture](ARCHITECTURE.md).

Rechecked on 4 October 2026, `npm audit` reports **1 high severity** finding. The package is `http-cache-semantics@4.2.0`, inherited only through `astro@7.3.5` (`^4.2.0`): [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp) / CVE-2026-93748. Affected versions are `<=4.2.0`. The advisory describes `max-stale` requests retrieving another user's security-zeroed cached response, including `Set-Cookie` values, from a shared cache. CVSS 3.1 score is 7.5 (CWE-524). The GitHub advisory, last modified 2 October 2026, still records `4.2.0` as the last affected version and lists no patched release.

`http-cache-semantics@4.3.0` was published on 4 October 2026. `npm audit fix` would move the lockfile to it because `4.3.0` sits outside the advisory range, but the published 4.2.0-to-4.3.0 diff does not change `max-stale` handling. It changes `Vary` matching (cited in that release as CVE-2026-93750) and adds a response status to cache hits. Do not run `npm audit fix` or `npm audit fix --force` for this finding, and do not treat `4.3.0` as the patch for GHSA-ch52-4w7c-c8xp until the advisory names a fixed version and the diff covers `max-stale`.

This project emits static files. No Astro server, user session, shared application response cache, or `node_modules` is deployed to GitHub Pages, so the cross-user cache behavior does not run in the deployed site. Revisit the lockfile before adding server rendering or authenticated content, and when an upstream release actually changes the `max-stale` behavior.
