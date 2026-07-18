# Milestone 4 Legal Sample Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task by task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Provide client-reviewable English Privacy and Terms webpage samples without making formal legal commitments.

**Architecture:** Separate static legal sample copy from React pages. A plain TypeScript content module defines the notice and sections, while public pages render them with existing semantic elements; tests validate the content module directly.

**Tech Stack:** React 19, TypeScript, React Router, Node `tsx --test`, ESLint, Vite.

## Global Constraints

- Display English only on public webpages; Chinese specs and plans are the review source.
- Both pages must display `Draft sample — requires owner and legal review before publication.`.
- `info@fitoa.net` is a display placeholder; do not configure mail, DNS, or remote services.
- Add no API, database, cookie, analytics service, or unverifiable legal claim.
- Retain `/privacy` and `/terms` routes and the existing public layout.

---

### Task 1: Establish testable legal sample copy

**Files:**

- Create: `src/react-app/content/legal.ts`
- Create: `tests/legal-content.test.ts`

**Interfaces:**

- Produces: `draftLegalNotice: string`.
- Produces: `privacySections` and `termsSections`, each item having `title: string` and `body: string`.

- [ ] **Step 1: Write the failing test**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { draftLegalNotice, privacySections, termsSections } from "../src/react-app/content/legal";

test("legal sample content states its draft status and data-request contact", () => {
  assert.equal(draftLegalNotice, "Draft sample — requires owner and legal review before publication.");
  assert.ok(privacySections.some(({ body }) => body.includes("info@fitoa.net")));
  assert.ok(privacySections.some(({ body }) => body.includes("authorized deletion")));
  assert.ok(termsSections.some(({ body }) => body.includes("provisional")));
});
```

- [ ] **Step 2: Run the test and confirm failure**

Run: `npx tsx --test tests/legal-content.test.ts`

Expected: failure because `src/react-app/content/legal` does not exist.

- [ ] **Step 3: Implement the minimal content module**

```ts
export const draftLegalNotice = "Draft sample — requires owner and legal review before publication.";

export const privacySections = [
  { title: "Information we collect", body: "This sample describes account information such as your name, email address, optional profile image, and technical data needed for authentication and sessions." },
  { title: "How information is used", body: "Information is used for account operation, security, support, and necessary service communications." },
  { title: "Retention", body: "Account information is retained until authorized deletion, a valid privacy or legal request, or an approved policy change." },
  { title: "Your requests", body: "For access, correction, or deletion requests, contact info@fitoa.net." },
];

export const termsSections = [
  { title: "Provisional website", body: "This website and its service content are provisional samples pending client confirmation." },
  { title: "Account use", body: "Users should provide accurate information, protect their login credentials, and not misuse the service." },
  { title: "Before publication", body: "Service scope, fees, liability, and dispute terms require owner and legal review before publication." },
  { title: "Contact", body: "For general policy questions, contact info@fitoa.net." },
];
```

- [ ] **Step 4: Run the test and confirm success**

Run: `npx tsx --test tests/legal-content.test.ts`

Expected: one passing subtest.

### Task 2: Render the samples on public pages

**Files:**

- Modify: `src/react-app/pages/public/Pages.tsx`

**Interfaces:**

- Consumes task 1's `draftLegalNotice`, `privacySections`, and `termsSections`.
- `Privacy` and `Terms` remain parameterless React components.

- [ ] **Step 1: Extend page imports**

```ts
import { draftLegalNotice, privacySections, termsSections } from "@/content/legal";
```

- [ ] **Step 2: Replace Privacy and Terms content with this pattern**

```tsx
function LegalSample({ sections }: { sections: typeof privacySections }) {
  return <><p className="rounded-md border border-amber-400/50 bg-amber-50 px-4 py-3 text-sm text-foreground dark:bg-amber-950/30">{draftLegalNotice}</p>{sections.map(({ title, body }) => <section key={title}><h2 className="text-xl font-semibold text-foreground">{title}</h2><p>{body}</p></section>)}</>;
}

export function Privacy() { return <Page title="Privacy"><LegalSample sections={privacySections} /></Page>; }
export function Terms() { return <Page title="Terms"><LegalSample sections={termsSections} /></Page>; }
```

- [ ] **Step 3: Run focused test and lint**

Run: `npx tsx --test tests/legal-content.test.ts`, then `npm run lint`.

Expected: both succeed; public pages add no direct database access.

### Task 3: Update task status and complete verification

**Files:**

- Modify: `TASKS.md`
- Modify: `TASKS.zh-CN.md`

- [ ] **Step 1: Check the six Milestone 4 items**

Change the Privacy/Terms sample, collected fields, retention, contact, data-request channel, and owner-approval markers to `[x]`; retain matching English and Chinese meanings.

- [ ] **Step 2: Run full local verification**

Run:

```text
npx tsx --test tests/public-navigation.test.ts tests/legal-content.test.ts
npm run build
npm run check
```

Expected: tests, build, and `wrangler deploy --dry-run` pass; `--dry-run` does not deploy.

- [ ] **Step 3: Start the local server and check routes**

With the development server running, request `http://localhost:5173/privacy` and `http://localhost:5173/terms`.

Expected: both routes return HTTP 200; stop the server after verification.

- [ ] **Step 4: Check diff integrity**

Run: `git -c safe.directory=E:/Workspaces/Cloudflare-Ankit diff --check`.

Expected: no whitespace or conflict-marker errors.
