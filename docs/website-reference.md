# Website reference: cingozlab.com

Structural and visual analysis of `https://cingozlab.com/index.html`, collected as a design reference. Nothing in this repository was changed on the basis of it.

- **Accessed:** 2026-10-08
- **Tool:** Scrapling 0.4.15 (MCP server `scrapling mcp` over stdio, plus the Scrapling Python library where the MCP tools fell short; see [Retrieval limits](#9-retrieval-limits))
- **Scope:** the homepage in full; `News.html` and `team.html` rendered for comparison; the other four subpages fetched as static HTML only
- **Robots:** `robots.txt` and `sitemap.xml` both return 404, so the site publishes no crawl rules

The site content, photographs, logos and text belong to the Cingöz Lab and Bezmialem Vakıf University. This file records structure and measurements only; none of the assets are copied here.

## 1. Summary

The site is a hand-edited static site built from **two unrelated templates**:

| Area                         | Template                                                      | Stylesheet            | Look                                                           |
| ---------------------------- | ------------------------------------------------------------- | --------------------- | -------------------------------------------------------------- |
| Homepage (`index.html`, `/`) | "Eventually" by HTML5 UP (CCA 3.0)                            | `assets/css/main.css` | Full-screen dark splash, white text, sliding background photos |
| All six subpages             | A Bootstrap-3-style grid theme (template name not identified) | `style.css`           | White page, boxed content, top navigation bar                  |

The homepage is a single-screen landing page with no scroll and **no article cards**. Card-like content exists only on the subpages (section 6).

## 2. Homepage structure

The served HTML is 2.2 KB. The whole page is one `<header>`, one `<footer>` and one script.

```
html
└─ body.is-preload                     (class removed by JS after load)
   ├─ header#header
   │  ├─ a.branding > img.logo         BILSAB.png, 149×42, empty alt
   │  ├─ hgroup                        "Welcome to the"
   │  ├─ h1                            "Cingöz Lab"
   │  ├─ h4                            "Cancer Therapy Resistance and Tumor Metabolism Laboratory"
   │  └─ div[align=right] > div > p    (empty) followed by six bare li.menu-item
   ├─ footer#footer
   │  ├─ ul.icons                      Twitter, Instagram, GitHub, Email
   │  └─ ul.copyright                  "Copyright Cingöz Lab., 2024." | "All rights reserved.©"
   ├─ script  assets/js/main.js
   └─ div#bg                           (injected by JS: nine background layers)
```

Markup observations:

- There are two `<h1>` elements; the first, inside the logo link, is empty.
- `<hgroup>` holds bare text rather than headings.
- The six menu `<li>` elements have no `<ul>` parent, so browsers draw stray list bullets at the left edge of the page.
- The menu uses deprecated `<font color="#A00808">` and `align="right"`. Leftover class names (`u-container-layout`, `u-text-3`) come from a third page builder and match no rule in `main.css`.
- No `<nav>`, no `<main>`, no `lang` attribute, no meta description, no favicon, no Open Graph tags.
- The viewport meta sets `user-scalable=no`, which blocks pinch zoom.

## 3. Navigation

### Homepage

| Label        | Target              |
| ------------ | ------------------- |
| RESEARCH     | `Research.html`     |
| TEAM         | `team.html`         |
| PUBLICATIONS | `Publications.html` |
| NEWS         | `News.html`         |
| GALLERY      | `gallery.html`      |
| CONTACT      | `contact.html`      |

- A vertical stack, right-aligned, placed below the tagline. Each link is 16 px Roboto with a 1 px dotted underline (`rgba(255,255,255,0.25)`).
- The markup asks for dark red (`#A00808`) but the links render white in the screenshots.
- Footer icon links: Twitter goes to `https://twitter.com/ACingozLab`, Email to `mailto:info@cingozlab.com`. Instagram and GitHub are placeholders (`href="#"`).
- The logo links back to `index.html`.

### Subpages

- White header bar, 94 px tall at desktop width, inside a 1170 px container.
- Left: logo plus the site title "Cingöz Lab". Right: a red home icon followed by the same six links in bold uppercase red, 13 px, with `28–32px` vertical padding.
- The current or hovered item gets a 2 px bottom border in `#69acc7`.
- At 990 px and below, the menu is hidden and a hamburger button (`.menu-toggle`, Font Awesome `fa-bars`) appears. `js/app.js` clones the menu into `.mobile-navigation` and toggles it with jQuery `slideToggle()`. The mobile menu is a centred vertical list on `#edf2f4` with white dividers.

## 4. Typography

### Homepage (`main.css`)

| Element           | Family             | Size at 1440 px   | Weight         | Line height      | Colour                   |
| ----------------- | ------------------ | ----------------- | -------------- | ---------------- | ------------------------ |
| Body              | Roboto, sans-serif | 16 px (`12pt`)    | 400            | 1.65em (26.4 px) | `rgba(255,255,255,0.75)` |
| `h1` "Cingöz Lab" | Roboto             | 52 px (`3.25em`)  | 700            | 1.25em (65 px)   | `#fff`                   |
| `h4` tagline      | Roboto             | 17.6 px (`1.1em`) | 700            | 26.4 px          | `#fff`                   |
| "Welcome to the"  | Roboto             | 16 px             | 400            | 26.4 px          | 75% white                |
| Menu links        | Roboto             | 16 px             | bold via `<b>` | 26.4 px          | white (rendered)         |
| Copyright         | Roboto             | 12.8 px (`0.8em`) | 400            | 26.4 px          | 50% white                |

- Letter spacing is `-0.01em` throughout.
- Base font size is set in points and steps with viewport width: `16pt` above 1680 px, `12pt` at 1680 px and below, `11pt` between 981 and 1280 px, back to `12pt` at 980 px and below.
- The `h1` drops from `3.25em` to `2em` (32 px) at 736 px and below.
- Fonts confirmed loaded in the browser: Roboto 400 and 700 (Google Fonts), Font Awesome 5 Free 400, Font Awesome 5 Brands 400.
- The template accent colour is `#1cb495` (teal), declared for links but overridden by `#header a { color: inherit }`, so it is not visible on the page.

### Subpages (`style.css`)

- Declared stack: `"Roboto", "Open Sans", sans-serif`, 15 px, weight 300, line height 1.5, colour `#8e9ca5`.
- **Roboto does not load on the subpages.** The Google Fonts link uses `http://` on an `https://` page, so the browser blocks it as mixed content and text falls back to the system sans-serif. The browser reported zero web fonts loaded on `News.html`.
- Headings are weight 700 with `line-height: normal`. `h2` renders at 22.5 px. Team names (`h3.team-name`) are 16 px, weight 400.
- Link colour is `#69acc7`. Secondary palette: `#69c7b7`, `#edf2f4`, `#dde7ea`.
- Much of the visible colour comes from inline `<font>` tags rather than the stylesheet, which is why news text is black and headings are dark red despite the grey body colour.

## 5. Layout

### Homepage

- `body` is a column flexbox with `justify-content: center`, black background, padding `6em 3.5em 3.5em` (96 / 56 / 56 px at 1440 px). The content block is therefore vertically centred in the viewport.
- The page is exactly one viewport tall at every tested size, with no scrolling.
- `#header` is left-aligned. At 1440×900 it occupies x 56–1384, y 213–727.
- `#footer` is absolutely positioned at the bottom-left (`bottom: 3.5em; left: 3.5em`), at 50% opacity, rising to 100% on hover. On viewports 640 px tall or less it returns to normal flow.
- **Background:** `main.js` injects `div#bg` (fixed, full screen, `opacity: 0.375` over black) containing nine child layers, one per image `images/bg01.jpg` to `bg09.jpg`. Each layer is 150% wide with `background-size: cover` and pans left by 25% (`@keyframes bg`: 45 s per pass, 29.25 s at 1280 px and below, 18 s at 736 px and below). Layers cross-fade every 6 s with a 3 s opacity transition.
- `body.is-preload` suppresses all animation until the window `load` event.
- `main.js` also contains the template's signup-form handler, but the page has no `#signup-form` element, so that code is dead.

### Subpages

- Bootstrap-3-style float grid: `.container` (750 / 970 / 1170 px), `.row`, `.col-md-*`, 15 px gutters.
- Sections are `.fullwidth-block` with 50 px vertical padding; some have a pale blue-grey background.
- Footer is a single copyright line with 50 px vertical padding.

## 6. Article cards

**The homepage has none.** The closest equivalents on the subpages:

| Page           | Pattern                               | Details                                                                                                                                                                                                                                                                                                                                         |
| -------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `News.html`    | One large boxed panel (`.boxed-icon`) | 1 px `#edf2f4` border, 5 px radius, `box-shadow: 0 1px 2px rgba(0,0,0,0.1)`, 30 px padding with 170 px left padding. Inside: a dark-red title, centred year markers ("-2026-", "-2024-"), and bulleted news items. Photos sit in a fixed-width `<table>` (665 px, cells about 227 px), not in a grid. No per-item card, date or link structure. |
| `team.html`    | Member tiles (`.col-md-3 > .team`)    | Four columns at desktop. Centred photo (about 200×200 px, square), name (`h3.team-name`, 16 px), role line, then two round icon links (email, web). Two members have no photo. The principal investigator has a wider block with a photo, bio paragraphs and LinkedIn / ORCID / email buttons.                                                  |
| `team.html`    | "Available positions" panel           | Same boxed style as the news panel, on the pale section background.                                                                                                                                                                                                                                                                             |
| `gallery.html` | Thumbnail links (`.fancybox-thumbs`)  | Six tiles linking to full-size JPEGs of 2.8–7.6 MB. Five use small thumbnails (about 30–50 KB); one uses the 7.2 MB original `IMG_5302.jpg` as its thumbnail.                                                                                                                                                                                   |

`style.css` also defines true card components that no page uses: `.post` (featured image with 5 px radius, 24 px light title, small date, arrow marker) and `.project-list .project` (three columns, two at 990 px and below, one at 480 px and below; bordered, 5 px radius, 20 px padding, soft shadow).

## 7. Responsive behaviour

Rendered in a real browser at four viewport sizes.

### Homepage

| Viewport | Body text | `h1`     | Side padding | Horizontal overflow |
| -------- | --------- | -------- | ------------ | ------------------- |
| 1440×900 | 16 px     | 52 px    | 56 px        | none                |
| 1024×768 | 14.67 px  | 47.67 px | 51 px        | none                |
| 768×1024 | 16 px     | 52 px    | 56 px        | none                |
| 390×844  | 16 px     | 32 px    | 32 px        | none                |

- Breakpoints in `main.css`: widths 1680, 1280, 980, 736, 480, 360 px; height 640 px.
- The layout does not reflow; only padding and font sizes change. The tagline wraps to two lines at 390 px.
- The menu stays right-aligned at every width. On mobile it reads as ragged, since each link's dotted underline starts at a different x position.

### Subpages

| Viewport | Navigation                                              | `News.html`                        | `team.html`                                         |
| -------- | ------------------------------------------------------- | ---------------------------------- | --------------------------------------------------- |
| 1440     | Inline bar, 94 px header                                | Fits                               | Four columns; page is 15 px wider than the viewport |
| 1024     | Inline bar wraps under the logo, header grows to 166 px | Fits                               | Four columns; 15 px overflow                        |
| 768      | Hamburger                                               | **Overflows: page is 901 px wide** | One column; 15 px overflow                          |
| 390      | Hamburger                                               | **Overflows: page is 752 px wide** | One column; 15 px overflow; page is 6061 px tall    |

- Breakpoints in `style.css`: 480, 640, 767/768, 990/991/992, 1199/1200 px, plus print rules.
- The news overflow comes from the fixed-width photo table and wide images escaping the boxed panel.
- On `team.html` at 390 px, the "Available positions" text is squeezed into a very narrow column by nested `<blockquote>` indentation.

## 8. Public assets

All URLs below were requested directly. Sizes are response body sizes.

### Stylesheets

| URL                                                                          | Status | Size    | Notes                                                           |
| ---------------------------------------------------------------------------- | ------ | ------- | --------------------------------------------------------------- |
| `/assets/css/main.css`                                                       | 200    | 22.8 KB | Homepage. Imports the next two entries.                         |
| `/assets/css/fontawesome-all.min.css`                                        | 200    | 59.4 KB | Font Awesome Free 5.15.4                                        |
| `https://fonts.googleapis.com/css?family=Roboto:400,700`                     | 200    | 10.7 KB | Homepage Roboto                                                 |
| `/style.css`                                                                 | 200    | 35.1 KB | Subpages                                                        |
| `/fonts/font-awesome.min.css`                                                | 200    | 17.7 KB | Font Awesome 4 (subpages)                                       |
| `/academicons.min.css`                                                       | 200    | 9.3 KB  | Local copy; its font files are missing (below)                  |
| `https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css` | 200    | 7.8 KB  | CDN copy, loaded alongside the local one                        |
| `http://fonts.googleapis.com/css?family=Roboto:300,400,700\|`                | 200    | 16.2 KB | Reachable directly, but blocked in the browser as mixed content |
| `/assets/css/noscript.css`                                                   | 404    | –       | Part of the original template; not referenced by the page       |

### JavaScript

| URL                                                           | Status | Size     | Notes                                                                                               |
| ------------------------------------------------------------- | ------ | -------- | --------------------------------------------------------------------------------------------------- |
| `/assets/js/main.js`                                          | 200    | 5.3 KB   | Homepage: background slideshow, `is-preload` removal, unused signup handler. No dependencies.       |
| `/js/jquery-1.11.1.min.js`                                    | 200    | 95.8 KB  | Subpages. Released 2014.                                                                            |
| `/js/plugins.js`                                              | 200    | 142.6 KB | Bundle containing FlexSlider, Isotope, Masonry, imagesLoaded, Owl Carousel, gmap3 and jQuery Easing |
| `/js/app.js`                                                  | 200    | 0.8 KB   | Mobile menu clone and toggle; FlexSlider and map initialisation                                     |
| `http://maps.google.com/maps/api/js?sensor=false&language=en` | 200    | 320.7 KB | `contact.html` only. Loaded over `http://` with no API key.                                         |

### Fonts

| URL                                                        | Status  | Notes                                                                   |
| ---------------------------------------------------------- | ------- | ----------------------------------------------------------------------- |
| `/assets/webfonts/fa-brands-400.{woff2,woff,ttf,eot,svg}`  | 200     | woff2 is 76.7 KB                                                        |
| `/assets/webfonts/fa-regular-400.{woff2,woff,ttf,eot,svg}` | 200     | woff2 is 13.2 KB                                                        |
| `/assets/webfonts/fa-solid-900.{woff2,woff,ttf,eot,svg}`   | 200     | woff2 is 78.3 KB                                                        |
| `/fonts/fontawesome-webfont.{woff,ttf,eot,svg}`            | 200     | Font Awesome 4; woff is 44.4 KB                                         |
| `/fonts/academicons.{woff,ttf,eot,svg}`                    | **404** | Referenced by the local `academicons.min.css`                           |
| Roboto (served from `fonts.gstatic.com`)                   | –       | Individual font files were not requested; only the Google Fonts CSS was |

### Images

| Group                | Files                                                                                                                     | Status | Notes                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------ |
| Homepage logo        | `/images/Main figures/BILSAB.png`                                                                                         | 200    | 91 KB, displayed at 149×42                                         |
| Homepage backgrounds | `/images/bg01.jpg` … `bg09.jpg`                                                                                           | 200    | 8–190 KB each, about 780 KB in total; all nine load on every visit |
| Subpage structure    | `/images/Structural/home-icon-1.png`                                                                                      | 200    | 2.7 KB                                                             |
| Research figures     | `/images/Main figures/{GBM.jpg, Fare.png, Therapy Resistance.jpg, Publication.jpeg, BILSAB bina.png, email.png, web.png}` | 200    | `BILSAB bina.png` is 1.9 MB, `Publication.jpeg` 1.0 MB             |
| Team photos          | `/images/Members/{AC.jpg, DI.JPG, HA.jpg, EB_bw.jpg}`                                                                     | 200    | `AC.jpg` is 813 KB                                                 |
| News                 | `/images/News/{Pezcoller-AC_1..3.jpg, ScienceAdv-paper.png, ScienceAdv-Cover.jpeg}`                                       | 200    | 195–876 KB                                                         |
| Gallery              | `/images/Gallery/IMG_*.JPG` and `*_thumb.JPG`                                                                             | 200    | Full-size files are 2.8–7.6 MB                                     |
| External             | `https://info.orcid.org/wp-content/uploads/2019/11/orcid_16x16.png`                                                       | 200    | Hot-linked ORCID icon                                              |

Broken references found:

| URL                                                                | Status | Referenced from                                                                 |
| ------------------------------------------------------------------ | ------ | ------------------------------------------------------------------------------- |
| `/images/Fare.png`                                                 | 404    | `News.html` (the file exists under `/images/Main figures/`)                     |
| `/images/arrow.png`, `/images/arrow-long.png`, `/images/quote.png` | 404    | `style.css`                                                                     |
| `/images/Members/`                                                 | 403    | Referenced as a bare directory path in `team.html`; directory listing is denied |

## 9. Retrieval limits

What Scrapling did and did not retrieve.

**Retrieved without problems**

- All seven HTML pages returned 200 through the plain HTTP tool (`make_request`, `bulk_get`). No anti-bot protection was met; the stealth tools were not needed.
- Rendered DOM and screenshots through MCP browser sessions (`open_session`, `session_fetch`, `screenshot`).

**Scrapling MCP limitations met**

1. **Non-HTML bodies are altered.** The MCP tools return content only as `markdown`, `html` or `text`, each produced by an HTML parser. For CSS and JavaScript this silently drops bytes: `main.js` came back as 2.2 KB of 5.3 KB (everything between a `<` and the next `>` was removed, including the background image list), `main.css` as 21.0 of 22.8 KB, `style.css` as 31.7 of 35.1 KB. The asset analysis above therefore uses raw bodies fetched with the Scrapling Python library (`Fetcher.get(...).body`).
2. **HTML is re-serialised, not raw.** The `html` extraction returns the parsed tree, so the doctype, comments' exact placement and original whitespace are not preserved. The structure in section 2 reflects the parsed DOM.
3. **No viewport control.** The MCP tools expose no viewport parameter, and passing `additional_args: {"viewport": …}` to `open_session` was accepted but ignored (all three sessions produced byte-identical screenshots). The responsive measurements in section 7 come from the Scrapling library's `DynamicFetcher` with a `page_action` that calls `set_viewport_size`.
4. **No response headers or binary bodies.** The MCP response model carries only status, content and URL. Content types and sizes in section 8 come from the library.
5. **The MCP server was driven by a script, not as native tools.** It is not registered in this Claude Code setup, so it was started over stdio and called through a small MCP client.

**Not retrieved or not verified**

- `robots.txt` and `sitemap.xml`: 404.
- Roboto font files on `fonts.gstatic.com`: not requested.
- Full-resolution image dimensions: only byte sizes were recorded.
- Interactive behaviour: the mobile menu was not clicked open, the gallery lightbox was not triggered, and the contact form and map on `contact.html` were not exercised. `gallery.html` uses a `.fancybox-thumbs` class, but no fancyBox code was found in `plugins.js`, so the lightbox may not work; this was not tested.
- `Research.html`, `Publications.html`, `gallery.html` and `contact.html` were fetched as static HTML only, not rendered.
- The subpage template's name and licence were not identified.
- One transient browser error (`net::ERR_CERT_VERIFIER_CHANGED` on `News.html`) occurred once and succeeded on automatic retry.
- Screenshots were taken at device scale factor 2 and kept in a temporary session folder; they are not stored in this repository.
