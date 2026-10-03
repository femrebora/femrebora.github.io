---
title: ECEGEN website
description: 'A multilingual website for a genetic diseases evaluation center, connecting clinical services, a searchable test catalogue, and patient information.'
draft: false
featured: true
category: Healthcare & laboratory technology
stack: [Next.js, React, TypeScript, Tailwind CSS]
tags: [Healthcare, Web development]
website: https://www.ecegen.com/
repository: https://github.com/ECEGEN/website
order: 1
image:
  src: /images/ecegen-homepage.webp
  alt: 'ECEGEN website homepage with Turkish navigation, test catalogue search, online appointments, and a genomic analysis feature.'
  width: 1600
  height: 816
  caption: 'ECEGEN homepage · Turkish interface · October 2026'
---

## A digital front door for a genetics center

ECEGEN is a genetic diseases evaluation center. Its public website brings together information about genetic services, a test catalogue, patient and clinician forms, news, and contact information.

This selected-work entry describes the implementation visible in the repository. It does not imply a particular job title, employment relationship, or sole authorship.

## Implementation

The application uses **Next.js 16, React 19, TypeScript, and Tailwind CSS v4**. Locale routing is implemented with **next-intl**, with Turkish as the default language and explicit paths for other locales.

The test catalogue supports text search and filters, with initial query and category state read from URL parameters. Content and test data live in dedicated source modules.

The header implements separate desktop and mobile navigation, with a menu control that exposes its expanded state. The frontend uses responsive breakpoints and shared visual tokens.

## Deployment configuration

The repository configures Next.js standalone output. A packaging script combines that output with public assets and compiled static assets, then creates a cPanel/Passenger-compatible entry point for Turhost. This describes the checked-in deployment configuration; it is not independent verification of the live server's infrastructure.

A GitHub Actions workflow runs linting, type checking, tests, and a production build.

## Source record

Reviewed at commit [`49793de`](https://github.com/ECEGEN/website/tree/49793deada55e7bef3668042cbd0f4c8ea559cd1). The following source files support this overview:

- [Package manifest](https://github.com/ECEGEN/website/blob/49793deada55e7bef3668042cbd0f4c8ea559cd1/package.json) — framework and dependencies.
- [Locale routing](https://github.com/ECEGEN/website/blob/49793deada55e7bef3668042cbd0f4c8ea559cd1/src/i18n/routing.ts) — language paths and defaults.
- [Test catalogue](https://github.com/ECEGEN/website/blob/49793deada55e7bef3668042cbd0f4c8ea559cd1/src/components/TestCatalogContent.tsx) — search and filters.
- [Site header](https://github.com/ECEGEN/website/blob/49793deada55e7bef3668042cbd0f4c8ea559cd1/src/components/SiteHeader.tsx) — responsive navigation.
- [Next.js configuration](https://github.com/ECEGEN/website/blob/49793deada55e7bef3668042cbd0f4c8ea559cd1/next.config.ts) and [packaging script](https://github.com/ECEGEN/website/blob/49793deada55e7bef3668042cbd0f4c8ea559cd1/scripts/package-turhost.mjs) — standalone runtime packaging.
- [CI workflow](https://github.com/ECEGEN/website/blob/49793deada55e7bef3668042cbd0f4c8ea559cd1/.github/workflows/ci.yml) — automated checks.
