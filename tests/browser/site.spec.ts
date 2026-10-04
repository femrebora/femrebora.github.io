import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import { resolve, join, extname } from 'node:path';

async function routeFixture(page: import('@playwright/test').Page) {
  const fixtureRoot = resolve('test-results/content-fixture');
  const types: Record<string, string> = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.woff2': 'font/woff2',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.xml': 'application/xml',
  };
  await page.route('http://content.test/**', async (route) => {
    const pathname = new URL(route.request().url()).pathname;
    const target = join(
      fixtureRoot,
      pathname,
      pathname.endsWith('/') ? 'index.html' : '',
    );
    if (!target.startsWith(fixtureRoot + '/')) {
      await route.abort();
      return;
    }
    try {
      await route.fulfill({
        body: await readFile(target),
        contentType: types[extname(target)] || 'application/octet-stream',
      });
    } catch {
      await route.fulfill({ status: 404, body: 'Missing fixture asset' });
    }
  });
}

/** Scroll as a reader would so lazy images load, then wait until each is decoded. */
async function loadImages(page: import('@playwright/test').Page) {
  for (const image of await page.locator('main img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
    await image.evaluate(async (element: HTMLImageElement) => {
      element.loading = 'eager';
      await element.decode();
    });
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
}

const routes = [
  '/',
  '/research/',
  '/research/trail-resistance/',
  '/work/',
  '/work/ecegen/',
  '/about/',
  '/cv/',
  '/credentials/',
  '/blog/',
  '/404.html',
];

test('all public pages fit phone, tablet, laptop, and desktop widths', async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(route);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} overflows at ${width}px`,
      ).toBe(true);
      expect(errors).toEqual([]);
    }
  }
});

for (const theme of ['light', 'dark'] as const) {
  test(`${theme} theme has no automated WCAG A/AA accessibility violations`, async ({
    page,
  }) => {
    test.setTimeout(120000);
    await page.emulateMedia({ colorScheme: theme });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(
        result.violations,
        `${route}: ${JSON.stringify(result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
      ).toEqual([]);
    }
  });
}

test('theme selection persists, follows the system until selected, and is keyboard accessible', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Use light theme' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.goto('/blog/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('navigation works without JavaScript, including the mobile menu; reduced motion and blocked storage are supported', async ({
  browser,
  page,
}) => {
  const desktop = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 },
  });
  const noJs = await desktop.newPage();
  await noJs.goto('http://127.0.0.1:4321/');
  await noJs
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Research', exact: true })
    .click();
  await expect(noJs).toHaveURL(/\/research\/$/);
  await expect(noJs.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(noJs.getByRole('button')).toHaveCount(0);
  await desktop.close();

  const mobile = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const noJsMobile = await mobile.newPage();
  await noJsMobile.goto('http://127.0.0.1:4321/');
  await noJsMobile.locator('.site-menu > summary').click();
  await expect(
    noJsMobile
      .locator('.site-menu nav')
      .getByRole('link', { name: 'Research', exact: true }),
  ).toBeVisible();
  await mobile.close();

  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage blocked');
      },
    });
  });
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Use dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe('auto');
});

test('keyboard skip link reaches main content and CV links serve a downloadable PDF', async ({
  page,
}) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const navCv = page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'CV', exact: true });
  await expect(navCv).toHaveAttribute('href', '/cv/');
  const response = await page.request.get('/cv/furkan-emre-bora-cv.pdf');
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
  await page.goto('/cv/');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download CV (PDF)' }).click();
  expect((await downloadPromise).suggestedFilename()).toBe(
    'furkan-emre-bora-cv.pdf',
  );
});

test('the mobile menu opens with 44px targets and never overflows', async ({
  page,
}) => {
  for (const width of [320, 375]) {
    await page.setViewportSize({ width, height: 812 });
    await page.goto('/');
    expect(
      await page
        .locator('.masthead-inner')
        .evaluate((element) => element.scrollWidth <= element.clientWidth),
      `masthead overflows at ${width}px`,
    ).toBe(true);
    await page.locator('.site-menu > summary').click();
    const menuLinks = page.locator('.site-menu nav a');
    await expect(menuLinks).toHaveCount(5);
    for (const link of await menuLinks.all()) {
      await expect(link).toBeVisible();
      const box = (await link.boundingBox())!;
      expect(box.height, await link.innerText()).toBeGreaterThanOrEqual(44);
    }
    const theme = page.getByRole('button', { name: /Use (dark|light) theme/ });
    expect((await theme.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
});

test('pages mark the current section and the About timeline links features to records', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/research/');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(
    nav.getByRole('link', { name: 'Research', exact: true }),
  ).toHaveAttribute('aria-current', 'page');

  await page.goto('/about/');
  const features = page.locator('.track-feature');
  await expect(features).toHaveCount(7);
  const feature = page.locator('.track-feature[data-entry="msc"]');
  await feature.hover();
  await expect(page.locator('#msc')).toHaveClass(/is-active/);
  await expect(page.locator('.track-readout')).toContainText(
    'Bezmialem Vakif University',
  );
  await feature.click();
  await expect(page).toHaveURL(/\/about\/#msc$/);
  await expect(page.locator('#msc')).toBeInViewport();
});

test('supplied images load at their intrinsic proportions on every page', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const route of ['/', '/work/ecegen/', '/about/']) {
    await page.goto(route);
    await loadImages(page);
    for (const image of await page.locator('main img').all()) {
      const ratios = await image.evaluate((element: HTMLImageElement) => ({
        intrinsic: element.naturalWidth / element.naturalHeight,
        rendered: element.clientWidth / element.clientHeight,
        cropped: element.classList.contains('is-cropped'),
        fit: getComputedStyle(element).objectFit,
      }));
      if (ratios.cropped) {
        expect(ratios.fit, `${route}: homepage preview should crop`).toBe(
          'cover',
        );
        expect(ratios.intrinsic).toBeGreaterThan(0);
      } else {
        expect(
          Math.abs(ratios.intrinsic - ratios.rendered),
          `${route}: image is cropped or stretched`,
        ).toBeLessThan(0.02);
      }
    }
  }
});

test('capture the production design for visual review', async ({ page }) => {
  const previews = [
    ['/', 'home'],
    ['/research/', 'research'],
    ['/research/trail-resistance/', 'trail-resistance'],
    ['/work/', 'work'],
    ['/work/ecegen/', 'ecegen'],
    ['/about/', 'about'],
    ['/cv/', 'cv'],
    ['/credentials/', 'credentials'],
    ['/blog/', 'blog'],
  ];
  for (const theme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: theme });
    for (const width of [375, 1440, 1920]) {
      await page.setViewportSize({ width, height: 960 });
      for (const [route, name] of previews) {
        await page.goto(route);
        await page.evaluate(() => document.fonts.ready);
        await loadImages(page);
        // Let any CSS animations (the career timeline) finish before capturing.
        await page.evaluate(() =>
          Promise.all(
            document.getAnimations().map((a) => a.finished.catch(() => null)),
          ),
        );
        await page.screenshot({
          path: `test-results/${name}-${theme}-${width}.png`,
          fullPage: true,
        });
      }
    }
  }
});

test('long-form Markdown and MDX remain readable and accessible in both themes', async ({
  page,
}) => {
  await routeFixture(page);
  for (const theme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: theme });
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 960 });
      await page.goto('http://content.test/blog/qa-formatting/');
      await expect(
        page.getByRole('navigation', { name: 'Table of contents' }),
      ).toBeVisible();
      await expect(page.locator('table')).toBeVisible();
      await expect(page.locator('pre')).toBeVisible();
      await expect(page.locator('.heading-anchor').first()).toBeAttached();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(result.violations).toEqual([]);
      await page.screenshot({
        path: `test-results/article-${theme}-${width}.png`,
        fullPage: true,
      });
    }
  }
  await page.getByRole('link', { name: /Next article/ }).click();
  await expect(page.locator('article')).toContainText(
    'A test-only expression: 4.',
  );
  await expect(
    page.getByRole('heading', { name: 'Related reading' }),
  ).toBeVisible();
});

test('writing filters show matching articles and recover from an empty result', async ({
  page,
}) => {
  await routeFixture(page);
  await page.goto('http://content.test/blog/');
  await expect(page.locator('.post-list > li:visible')).toHaveCount(6);
  await page.getByLabel('Category', { exact: true }).selectOption('Software');
  await expect(page.locator('.post-list > li:visible')).toHaveCount(1);
  await page.getByLabel('Topic', { exact: true }).selectOption('Notes');
  await expect(page.locator('.post-list > li:visible')).toHaveCount(0);
  await expect(page.locator('.filter-empty')).toBeVisible();
  await page.getByLabel('Category', { exact: true }).selectOption('');
  await page.getByLabel('Topic', { exact: true }).selectOption('');
  await expect(page.locator('.post-list > li:visible')).toHaveCount(6);
});

test('empty writing, credentials, and the ECEGEN case study stay free of audit clutter', async ({
  page,
}) => {
  await page.goto('/');
  const order = await page
    .locator('#research, #work, #blog, #background, #contact')
    .evaluateAll((elements) => elements.map((element) => element.id));
  expect(order).toEqual(['research', 'work', 'blog', 'background', 'contact']);
  await expect(
    page.getByRole('link', { name: 'Explore research' }),
  ).toHaveAttribute('href', '#research');
  await expect(page.getByRole('link', { name: 'View CV' })).toHaveAttribute(
    'href',
    '/cv/',
  );
  const pdf = page.getByRole('link', { name: 'Download CV (PDF)' });
  await expect(pdf).toHaveAttribute('href', '/cv/furkan-emre-bora-cv.pdf');
  await expect(page.locator('main')).not.toContainText(/in preparation/i);
  await expect(page.locator('main')).not.toContainText(/credentials/i);

  await page.goto('/blog/');
  await expect(page.locator('main')).toContainText(
    'No articles published yet.',
  );
  await expect(page.locator('main').getByRole('link')).toHaveCount(0);
  await expect(page.locator('.writing-filters')).toHaveCount(0);

  await page.goto('/cv/');
  await expect(
    page.getByRole('heading', { name: 'Certificates & training' }),
  ).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible();
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.masthead')).toBeHidden();
  await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible();
  await page.emulateMedia({ media: 'screen' });

  await page.goto('/about/');
  await expect(
    page.getByRole('heading', { name: 'Certificates & training' }),
  ).toHaveCount(0);

  await page.goto('/credentials/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Certificates & training',
  );
  await expect(page.getByRole('link', { name: 'View the CV' })).toHaveAttribute(
    'href',
    '/cv/',
  );
  await expect(page.locator('main')).not.toContainText(
    /approved|sanitized|verified/i,
  );

  await page.goto('/work/ecegen/');
  await expect(page.locator('main')).not.toContainText('Source record');
  await expect(page.locator('main')).not.toContainText('49793de');
  await expect(
    page.getByRole('link', { name: 'Visit website' }),
  ).toHaveAttribute('href', 'https://www.ecegen.com/');
  await expect(page.getByRole('link', { name: 'Source code' })).toHaveAttribute(
    'href',
    'https://github.com/ECEGEN/website',
  );
});

test('the homepage shows at most four posts and does not repeat the featured one', async ({
  page,
}) => {
  await routeFixture(page);
  await page.goto('http://content.test/');
  const order = await page
    .locator('#blog, #research, #work')
    .evaluateAll((elements) => elements.map((element) => element.id));
  expect(order).toEqual(['blog', 'research', 'work']);
  const hrefs = await page
    .locator('main a[href*="/blog/"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  const posts = [
    ...new Set(hrefs.filter((href) => href && /\/blog\/qa-/.test(href))),
  ];
  expect(posts.length).toBeLessThanOrEqual(4);
  expect(posts).toContain('/blog/qa-featured/');
  expect(posts).not.toContain('/blog/qa-formatting/');
  expect(posts).not.toContain('/blog/qa-newer/');
  const listed = await page
    .locator('.post-list a')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  expect(listed.some((href) => href?.includes('qa-featured'))).toBe(false);
});
