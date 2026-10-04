# F. Emre Bora — personal website

Source for [femrebora.github.io](https://femrebora.github.io), the personal site of F. Emre Bora, a bioinformatician working across clinical genomics, cancer functional genomics, and computational biology.

The site is a small research journal: a typography-led homepage with teasers, plus dedicated pages for research, writing, selected work, background, CV, and credentials. It is a static site with no backend, no analytics, and no third-party requests.

## Pages

| Route           | Contents                                                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `/`             | Introduction, research spotlight, selected work, a short writing note, and contact. Writing leads once articles are published           |
| `/research/`    | Research interests, research records with institution/period/method metadata, methods, and the thesis case study                        |
| `/blog/`        | Writing index with filters, categories, tags, and RSS (canonical writing path)                                                          |
| `/work/`        | Selected work, including the ECEGEN website case study                                                                                  |
| `/about/`       | Narrative, education and experience, the career timeline, skills, and languages                                                         |
| `/cv/`          | A printable HTML CV built from shared data, with a link to the sanitized PDF                                                            |
| `/credentials/` | Certificates and training. A short note and a link to the CV until an entry exists; the empty section is left off the CV and About page |

Research and project detail pages keep their existing paths (`/research/trail-resistance/`, `/work/ecegen/`), and the homepage keeps the legacy anchors `#research`, `#background`, `#work`, `#blog`, and `#contact`.

## Built with

- [Astro](https://astro.build) 7 with strict TypeScript, generating static HTML
- A tokenized custom-CSS system under `src/styles/` (no utility framework)
- Astro Content Collections for Markdown and MDX — writing, research, projects, credentials, notes — with schemas checked at build time
- Self-hosted Newsreader (display and reading) and DM Sans (interface), latin and latin-ext for Turkish
- Native cross-document View Transitions for continuous-feeling navigation (CSS only, reduced-motion aware)
- GitHub Actions for verification and deployment to GitHub Pages

Client-side JavaScript is limited to the theme switch, the blog filters, the About career-timeline details, the article heading links, and the CV print button. All content and navigation work without it.

## Design

A warm editorial "contemporary research journal": warm paper and deep ink, a restrained forest-green accent, Newsreader headings and DM Sans interface text. The masthead is a compact horizontal bar — name, Writing, Research, Work, About, CV, and a theme control — with a no-JavaScript disclosure menu on small screens. Motion is limited to short hover feedback, a subtle timeline entrance, and native view transitions, and is switched off for visitors who prefer reduced motion. See [the design note](docs/DESIGN.md).

## Run it locally

Requires Node.js 24 (`.nvmrc` selects it with nvm).

```sh
nvm use
npm ci
npm run dev        # http://localhost:4321
```

Other commands:

```sh
npm run build      # production build in dist/
npm run preview    # serve the production build
npm run verify     # formatting, type checks, tests, build, and link checks
```

Browser tests use Playwright and axe, and cover responsive layout, accessibility in both themes, keyboard use, and navigation without JavaScript:

```sh
npx playwright install chromium
npm run test:browser
```

## Project structure

```text
src/
  components/    Header/footer, page primitives, records, post list, timeline, icons
  content/       Writing, research, projects, credentials, and notes in Markdown/MDX
  data/          Profile, experience, education, skills, and languages
  layouts/       Shared document shell, metadata, and themes
  pages/         Routes, RSS feed, and 404
  styles/        Design tokens and the split stylesheet (see docs/ARCHITECTURE.md)
public/          Images, CV, favicon, and social preview
tests/           Publication rules, content-build integration, and browser checks
docs/            Architecture, design, maintenance, and verification notes
```

## Adding content

One file per addition, no layout edits required: copy the collection's template in `src/content/<collection>/`, replace every field, set `draft: false`, and run `npm run verify`. Personal data (contact links, timeline entries, skills) lives in `src/data/profile.ts`. Details in [Maintaining the site](docs/MAINTAINING.md).

## Quality checks

Every push runs formatting, type checking, unit tests, a production build, and a check of every internal link and anchor before the site is deployed. Draft and future-dated content is excluded from pages, the RSS feed, and the sitemap at build time.

## Documentation

- [Architecture](docs/ARCHITECTURE.md): rendering, content model, CSS map, motion, and accessibility
- [Design note](docs/DESIGN.md): the visual system and content workflow
- [Maintaining the site](docs/MAINTAINING.md): adding content, publishing, and dependency notes
- [Verification record](docs/VERIFICATION.md): what was tested and the results

## Contact

- Email: [furkanemrebora@gmail.com](mailto:furkanemrebora@gmail.com)
- LinkedIn: [femre-bora](https://linkedin.com/in/femre-bora)
- GitHub: [femrebora](https://github.com/femrebora)
