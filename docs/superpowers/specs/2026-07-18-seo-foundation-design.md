# Milestone 5: SEO foundation design

## Purpose

Provide baseline SEO metadata and crawlable static entry points for Cloudflare-Ankit's public pages in the current React/Vite SPA, without adding Astro, SSR, or unconfirmed business claims.

## Temporary domain rules

- The development-stage canonical root is `https://fitoa.net`.
- Public-route canonicals use that root plus the route path.
- The `www` redirect is future remote DNS/Cloudflare work and is not performed in this milestone.

## Page metadata

- Add a frontend-only route metadata module that defines English title, description, canonical path, and index state by pathname.
- Indexable public routes are `/`, `/about`, `/services`, `/contact`, `/privacy`, and `/terms`.
- Login, signup, account, profile, verification, password-reset, and Not Found pages use `noindex`.
- Update document title, description, canonical, Open Graph, and robots meta tags whenever the route changes.
- Descriptions use only confirmed provisional project facts and do not invent services, prices, locations, customers, or legal promises.

## Static search entry points

- Add `public/robots.txt` to permit public crawling and declare the sitemap URL.
- Add `public/sitemap.xml` listing only the six indexable public pages.
- Add a local static Open Graph sample image: a simple Cloudflare-Ankit wordmark without business-promotional content.

## Accessibility and site structure

- Retain the existing semantic `h1` elements, internal navigation, footer links, and Not Found behavior.
- Add no contentless images; the social image is referenced only by metadata.

## SPA limitation

Record in the README and architecture documents that client-side route metadata is written after the app runs, so crawlers that do not execute JavaScript may see only initial HTML. Evaluate SSR or prerendering later only with evidence and authorization.

## Verification

- Add route-metadata tests covering the home canonical, public-page indexing, and noindex for account and Not Found.
- Run lint, build, existing tests, and `npm run check` (dry-run only).
- Request public pages locally and confirm HTTP 200; do not deploy.
