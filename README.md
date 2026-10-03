# F. Emre Bora — personal website

Source for [femrebora.github.io](https://femrebora.github.io), the personal site of F. Emre Bora, a bioinformatician working across clinical genomics, cancer functional genomics, and computational biology.

The site presents research, writing, selected software work, and a CV. It is a static site with no backend, no analytics, and no third-party requests.

## What is on the site

| Section  | Contents                                                                    |
| -------- | --------------------------------------------------------------------------- |
| Home     | Introduction, featured research, selected work, and background              |
| Research | Research interests and the MSc thesis on TRAIL resistance in glioblastoma   |
| Writing  | Notes and essays on bioinformatics and scientific computing, with RSS       |
| Work     | Selected technical projects, including the ECEGEN website                   |
| About    | Profile, experience, education, languages, areas of work, and a CV download |

## Built with

- [Astro](https://astro.build) 7 with strict TypeScript, generating static HTML
- [Tailwind CSS](https://tailwindcss.com) v4 and a small set of design tokens in one stylesheet
- Astro Content Collections for Markdown and MDX, with schemas checked at build time
- Self-hosted IBM Plex Sans, Source Serif 4, and IBM Plex Mono
- GitHub Actions for verification and deployment to GitHub Pages

The only client-side JavaScript is the theme switch and the writing filters. Everything else, including navigation, works without it.

## Design

A sticky navigation rail on wide screens that becomes a compact top bar on phones, light and dark themes with a single warm accent, and a serif reading face for long-form text. Research and projects are shown as structured records rather than cards. Motion is limited to hover feedback and a short cross-fade between pages, and is switched off for visitors who prefer reduced motion.

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
  components/    Navigation rail, records, timeline, icons
  content/       Writing, research, projects, and notes in Markdown/MDX
  data/          Profile, experience, education, and skills
  layouts/       Shared document shell, metadata, and themes
  pages/         Routes, RSS feed, and 404
  styles/        Design tokens and all styling
public/          Images, CV, favicon, and social preview
tests/           Publication rules and browser checks
docs/            Architecture, maintenance, and verification notes
```

## Quality checks

Every push runs formatting, type checking, unit tests, a production build, and a check of every internal link and anchor before the site is deployed. Draft and future-dated content is excluded from pages, the RSS feed, and the sitemap at build time.

## Documentation

- [Architecture](docs/ARCHITECTURE.md): rendering, content model, presentation, and accessibility
- [Maintaining the site](docs/MAINTAINING.md): adding content, publishing, and dependency notes
- [Verification record](docs/VERIFICATION.md): what was tested and the results

## Contact

- Email: [furkanemrebora@gmail.com](mailto:furkanemrebora@gmail.com)
- LinkedIn: [femre-bora](https://linkedin.com/in/femre-bora)
- GitHub: [femrebora](https://github.com/femrebora)
