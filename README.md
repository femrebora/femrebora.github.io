# F. Emre Bora — personal website

Source for [femrebora.github.io](https://femrebora.github.io), the personal site of F. Emre Bora, a bioinformatician working across clinical genomics, cancer functional genomics, and computational biology.

The site presents research, background, selected software work, a blog, and a CV. It is a static site with no backend, no analytics, and no third-party requests.

## What is on the site

The site is a single page with a section for each part of the profile, plus detail pages for the thesis, projects, and blog posts.

| Section       | Contents                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------- |
| Introduction  | Who I am, current role and affiliation, and a CV download                                   |
| Research      | The MSc thesis on TRAIL resistance in glioblastoma, research interests, and methods         |
| Background    | A genome-browser-style timeline of education, research, and work, with skills and languages |
| Selected work | Technical projects, including the ECEGEN website                                            |
| Blog          | Notes and essays on bioinformatics and scientific computing, with RSS                       |
| Contact       | Email, LinkedIn, GitHub, and the CV                                                         |

## Built with

- [Astro](https://astro.build) 7 with strict TypeScript, generating static HTML
- [Tailwind CSS](https://tailwindcss.com) v4 and a small set of design tokens in one stylesheet
- Astro Content Collections for Markdown and MDX, with schemas checked at build time
- Self-hosted IBM Plex Sans, Source Serif 4, and IBM Plex Mono
- GitHub Actions for verification and deployment to GitHub Pages

Client-side JavaScript is limited to the theme switch, section tracking in the navigation, timeline hover details, and the blog filters. All content and navigation work without it.

## Design

A sticky navigation rail on wide screens that becomes a compact top bar on phones, light and dark themes with a single warm accent, and a serif reading face for long-form text. The background section draws education, research, and work as features on a shared time axis, in the manner of a genome browser; each feature links to its written record. Research and projects are shown as structured records rather than cards. Motion is limited to hover feedback and a short cross-fade between pages, and is switched off for visitors who prefer reduced motion.

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
