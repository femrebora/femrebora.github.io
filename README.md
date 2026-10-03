# F. Emre Bora — personal website

Source for [femrebora.github.io](https://femrebora.github.io), the personal site of F. Emre Bora, a bioinformatician working across clinical genomics, cancer functional genomics, and computational biology.

The site is a small research journal: a typography-led homepage with teasers, plus dedicated pages for research, writing, selected work, background, CV, and credentials. It is a static site with no backend, no analytics, and no third-party requests.

## Pages

| Route           | Contents                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------ |
| `/`             | Introduction, and teasers for writing, the research spotlight, selected work, and contact  |
| `/research/`    | Research interests, completed work, methods, and the thesis case study                     |
| `/blog/`        | Writing index with filters, categories, tags, and RSS (canonical writing path)             |
| `/work/`        | Selected work, including the ECEGEN website case study                                     |
| `/about/`       | Narrative, education and experience, the career timeline, skills, and languages            |
| `/cv/`          | A printable HTML CV built from shared data, with a link to the sanitized PDF               |
| `/credentials/` | Certificates and education evidence, with an honest empty state until entries are approved |

Research and project detail pages keep their existing paths (`/research/trail-resistance/`, `/work/ecegen/`), and the homepage keeps the legacy anchors `#research`, `#background`, `#work`, `#blog`, and `#contact`.

## Built with

- [Astro](https://astro.build) 7 with strict TypeScript, generating static HTML
- [Tailwind CSS](https://tailwindcss.com) v4 and a small set of design tokens in one stylesheet
- Astro Content Collections for Markdown and MDX, with schemas checked at build time
- Self-hosted Newsreader (display and reading) and DM Sans (interface), latin and latin-ext for Turkish
- GitHub Actions for verification and deployment to GitHub Pages

Client-side JavaScript is limited to the theme switch, the blog filters, the About career-timeline details, the article heading links, and the CV print button. All content and navigation work without it.

## Design

A warm editorial "contemporary research journal": warm paper (`#F7F5F0`) and deep ink, a restrained forest-green accent (`#185C50`), Newsreader for expressive headings and long-form reading, and DM Sans for navigation and interface text. The masthead is a compact horizontal bar — name, Writing, Research, Work, About, CV, and a theme control — with a no-JavaScript disclosure menu on small screens. Pages share one system but play different roles: an expressive introduction, a concise writing index, a larger research feature, and an image-led ECEGEN work preview. See [the design note](docs/DESIGN.md).

The About page draws education, exchange, research, and work as features on a shared time axis in the manner of a genome browser; each feature links to its written record, and the written lists carry the full detail. Motion is limited to short hover feedback and a subtle entrance for timeline features, and is switched off for visitors who prefer reduced motion.

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
  components/    Masthead, records, post list, career timeline, icons
  content/       Writing, research, projects, and notes in Markdown/MDX
  data/          Profile, experience, education, skills, and credentials
  layouts/       Shared document shell, metadata, and themes
  pages/         Routes, RSS feed, and 404
  styles/        Design tokens and all styling
public/          Images, CV, favicon, and social preview
tests/           Publication rules and browser checks
docs/            Architecture, design, maintenance, and verification notes
```

## Quality checks

Every push runs formatting, type checking, unit tests, a production build, and a check of every internal link and anchor before the site is deployed. Draft and future-dated content is excluded from pages, the RSS feed, and the sitemap at build time.

## Documentation

- [Architecture](docs/ARCHITECTURE.md): rendering, content model, presentation, and accessibility
- [Design note](docs/DESIGN.md): the visual system and content workflow
- [Maintaining the site](docs/MAINTAINING.md): adding content, publishing, and dependency notes
- [Verification record](docs/VERIFICATION.md): what was tested and the results

## Contact

- Email: [furkanemrebora@gmail.com](mailto:furkanemrebora@gmail.com)
- LinkedIn: [femre-bora](https://linkedin.com/in/femre-bora)
- GitHub: [femrebora](https://github.com/femrebora)
