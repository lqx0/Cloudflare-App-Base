# SEO Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add route-specific SEO metadata and static search entry points for the current Cloudflare-Ankit SPA.

**Architecture:** A pure TypeScript module defines route metadata and is tested without a browser. A small React effect synchronizes that data with document metadata on route changes. Static crawler files live in `public/`, and project documents state the SPA limitation.

**Tech Stack:** React 19, TypeScript, React Router, Vite, Node `tsx --test`, SVG/PNG static assets.

## Global Constraints

- Canonical root is `https://fitoa.net`; do not configure DNS, redirects, deployment, or remote services.
- Use English public metadata and Chinese documentation as the review source.
- Index only `/`, `/about`, `/services`, `/contact`, `/privacy`, and `/terms`.
- Use `noindex` for account, profile, authentication, and Not Found routes.
- Do not add Astro, SSR, analytics, unconfirmed business claims, or structured data.
- Every completed task must be verified and committed locally before the next task begins.

---

### Task 1: Define and test route SEO metadata

**Files:**

- Create: `src/react-app/lib/seo.ts`
- Create: `tests/seo-metadata.test.ts`

**Interfaces:**

- Produces `getSeoMetadata(pathname: string): SeoMetadata`.
- `SeoMetadata` contains `title`, `description`, `canonicalPath`, and `indexable`.

- [ ] **Step 1: Write the failing test**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { getSeoMetadata } from "../src/react-app/lib/seo";

test("returns canonical metadata for the public home route", () => {
  const metadata = getSeoMetadata("/");
  assert.equal(metadata.canonicalPath, "/");
  assert.equal(metadata.indexable, true);
  assert.match(metadata.title, /Cloudflare-Ankit/);
});

test("marks account and unknown routes as noindex", () => {
  assert.equal(getSeoMetadata("/account").indexable, false);
  assert.equal(getSeoMetadata("/missing").indexable, false);
});
```

- [ ] **Step 2: Run the test and confirm failure**

Run: `npx tsx --test tests/seo-metadata.test.ts`

Expected: module-not-found failure for `src/react-app/lib/seo`.

- [ ] **Step 3: Implement minimal metadata lookup**

Create `SeoMetadata`, a six-route metadata record, and `getSeoMetadata` that normalizes trailing slashes and returns a non-indexable Not Found fallback. Use titles and descriptions limited to provisional Cloudflare-Ankit facts.

- [ ] **Step 4: Run focused tests, lint, and commit**

Run: `npx tsx --test tests/seo-metadata.test.ts` and `npm run lint`.

Commit:

```text
git add src/react-app/lib/seo.ts tests/seo-metadata.test.ts
git commit -m "feat: add route SEO metadata"
```

### Task 2: Add static crawler resources and social image

**Files:**

- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Create: `public/cloudflare-ankit-social-card.png`

**Interfaces:**

- `robots.txt` references `https://fitoa.net/sitemap.xml`.
- `sitemap.xml` contains exactly the six indexable canonical URLs.
- The image is a 1200×630 simple Cloudflare-Ankit wordmark sample for Open Graph metadata.

- [ ] **Step 1: Write static-resource assertions**

Extend `tests/seo-metadata.test.ts` to read the two text files and assert the sitemap URL, six `<loc>` entries, and only `https://fitoa.net` canonical URLs.

- [ ] **Step 2: Run the test and confirm failure**

Run: `npx tsx --test tests/seo-metadata.test.ts`

Expected: file-not-found failure for `public/robots.txt`.

- [ ] **Step 3: Add crawler files and image**

Use `User-agent: *`, `Allow: /`, and the sitemap declaration. Add the six canonical URLs in XML. Generate a non-photographic 1200×630 raster card reading `Cloudflare-Ankit` and `Provisional project` with no claims, customers, logos, or third-party marks.

- [ ] **Step 4: Run focused tests and commit**

Run: `npx tsx --test tests/seo-metadata.test.ts`.

Commit:

```text
git add public/robots.txt public/sitemap.xml public/cloudflare-ankit-social-card.png tests/seo-metadata.test.ts
git commit -m "feat: add SEO crawler resources"
```

### Task 3: Synchronize document metadata and document SPA limits

**Files:**

- Create: `src/react-app/components/SeoMetadata.tsx`
- Modify: `src/react-app/App.tsx`
- Modify: `README.md`
- Modify: `README.zh-CN.md`
- Modify: `ARCHITECTURE.md`
- Modify: `ARCHITECTURE.zh-CN.md`
- Modify: `TASKS.md`
- Modify: `TASKS.zh-CN.md`

**Interfaces:**

- `SeoMetadata` reads `useLocation()` and `getSeoMetadata()`.
- It updates title, description, canonical, `og:title`, `og:description`, `og:url`, `og:image`, and robots meta tags on every route change.

- [ ] **Step 1: Write the failing component-source test**

Add an assertion to `tests/seo-metadata.test.ts` that reads `src/react-app/components/SeoMetadata.tsx` and checks for `og:image`, `canonical`, and `getSeoMetadata` before the component exists.

- [ ] **Step 2: Run the test and confirm failure**

Run: `npx tsx --test tests/seo-metadata.test.ts`

Expected: file-not-found failure for `SeoMetadata.tsx`.

- [ ] **Step 3: Implement metadata synchronization and mount it**

Create idempotent helpers that create or update named and property metadata tags and the canonical link. Set the image URL to `https://fitoa.net/cloudflare-ankit-social-card.png`. Mount `<SeoMetadata />` inside `AppContent` so React Router location changes trigger updates.

- [ ] **Step 4: Record limitation, update tasks, verify, and commit**

Add a concise SPA crawler limitation to both README and architecture document pairs. Mark all Milestone 5 items complete in both task lists. Run:

```text
npx tsx --test tests/public-navigation.test.ts tests/legal-content.test.ts tests/seo-metadata.test.ts
npm run lint
npm run build
npm run check
```

Start the local server and request `/`, `/privacy`, `/robots.txt`, and `/sitemap.xml`; expect HTTP 200. Stop the server and run `git diff --check`.

Commit:

```text
git add src/react-app/components/SeoMetadata.tsx src/react-app/App.tsx README.md README.zh-CN.md ARCHITECTURE.md ARCHITECTURE.zh-CN.md TASKS.md TASKS.zh-CN.md tests/seo-metadata.test.ts
git commit -m "feat: apply public route SEO metadata"
```
