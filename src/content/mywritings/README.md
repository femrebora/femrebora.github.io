# My writings

Put your weekly blogs, notes, and essays in this folder. Each post is one Markdown (`.md`) or MDX (`.mdx`) file. The website reads this folder automatically; you do not need to edit homepage or blog components.

This guide is excluded from the article collection. The supplied `article-template.md` is a draft and stays unpublished.

## Start a weekly post

1. Copy `article-template.md` in this folder.
2. Give the copy a descriptive filename, for example `2026-10-08-analysis-notes.md`. Use lowercase words and hyphens. That filename becomes `/blog/2026-10-08-analysis-notes/`; keep it stable after publishing.
3. Replace the template title, description, date, tags, category, language, and body with your own writing. Use `language: en` or `language: tr`.
4. Keep `draft: true` while working. Drafts stay off the website, homepage, search, feed, and sitemap.

At the top of every post, keep the metadata between the two `---` lines:

```yaml
---
title: 'Your article title'
description: 'A short summary of your article.'
publishedDate: 2026-10-08
category: Notes
tags: [Bioinformatics]
language: en
draft: true
featured: false
---
```

Write the article below the closing `---`. Replace this example date and every example field before publishing.

## Preview and publish

Run commands from the repository root, not this folder:

```sh
nvm use
npm run dev
```

Open `http://localhost:4321`. Drafts are also hidden locally. When you are ready to preview the actual post, set its `draft` to `false` and use a publication date no later than today. It will appear automatically on its article page, the writing archive, topic pages, and the homepage when it is among the latest four posts or selected as featured. Set it back to `true` if it is not ready to publish.

Set `featured: true` to request the homepage lead; the newest featured post wins. Tags create topics automatically. You do not need to change article lists manually.

Before publishing:

```sh
npm run verify
```

Once your checks pass and you choose to publish, commit the ready post and push to `main`. The existing GitHub Actions workflow verifies the site and deploys it to GitHub Pages. Check that workflow completes before checking the live article. New folder/configuration changes must be included in the first deployment.

Future-dated posts require a new build after their publication date; there is no automatic weekly scheduler. A draft committed to this public repository remains visible in GitHub source, so keep private writing outside the public repository.

## Update an existing post

Edit the same file and optionally add `updatedDate: YYYY-MM-DD`, no earlier than its original `publishedDate`. Keep its filename unchanged to preserve links. Run the checks and publish through the same workflow.

See [the maintenance guide](../../../docs/MAINTAINING.md) for images, references, article formatting, and the full publishing workflow.
