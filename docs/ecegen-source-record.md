# ECEGEN source record

Maintenance note for the selected-work case study. This file is not part of a content collection and is not rendered on the site.

Do not copy this inventory, the reviewed commit, or an authorship disclaimer back into `src/content/projects/ecegen.md` or any other public page. The case study should stay a concise account of the website's purpose, the supported contribution, selected behaviour, the technology, and the ordinary website and source links.

Employment as a bioinformatician at ECEGEN is recorded in `src/data/profile.ts`. That record is not proof of authorship of every website component. The public contribution line stays narrow: the site was supported alongside that role. Do not add claims of sole authorship, a web-development job title, leadership, or measured performance or conversion gains. The component-level credit is still unconfirmed; record it in `docs/CONTENT-TODO.md` when the owner supplies it, rather than turning the gap into public copy.

Commit references, DOIs, and ORCID identifiers remain appropriate inside future technical articles when they belong to that article.

## Evidence kept off the public page

Reviewed against [ECEGEN/website `49793deada55e7bef3668042cbd0f4c8ea559cd1`](https://github.com/ECEGEN/website/tree/49793deada55e7bef3668042cbd0f4c8ea559cd1) (short `49793de`):

- [Package manifest](https://github.com/ECEGEN/website/blob/49793deada55e7bef3668042cbd0f4c8ea559cd1/package.json) — Next.js, React, TypeScript, Tailwind CSS.
- [Locale routing](https://github.com/ECEGEN/website/blob/49793deada55e7bef3668042cbd0f4c8ea559cd1/src/i18n/routing.ts) — language paths, Turkish default.
- [Test catalogue](https://github.com/ECEGEN/website/blob/49793deada55e7bef3668042cbd0f4c8ea559cd1/src/components/TestCatalogContent.tsx) — search and filters.
- [Site header](https://github.com/ECEGEN/website/blob/49793deada55e7bef3668042cbd0f4c8ea559cd1/src/components/SiteHeader.tsx) — responsive navigation and expanded state.
- [Next.js configuration](https://github.com/ECEGEN/website/blob/49793deada55e7bef3668042cbd0f4c8ea559cd1/next.config.ts) and [packaging script](https://github.com/ECEGEN/website/blob/49793deada55e7bef3668042cbd0f4c8ea559cd1/scripts/package-turhost.mjs) — standalone output and a cPanel/Passenger entry point for Turhost. This is checked-in deployment configuration, not independent verification of the live server.
- [CI workflow](https://github.com/ECEGEN/website/blob/49793deada55e7bef3668042cbd0f4c8ea559cd1/.github/workflows/ci.yml) — lint, type check, tests, and a production build.

The homepage screenshot in `public/images/ecegen-homepage.webp` was captured in October 2026. The public caption does not repeat that review date.
