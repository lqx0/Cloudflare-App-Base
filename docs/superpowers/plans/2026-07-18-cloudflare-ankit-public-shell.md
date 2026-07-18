# Cloudflare-Ankit Public Shell Implementation Plan

> This is the English synchronization of `2026-07-18-cloudflare-ankit-public-shell.zh-CN.md`. Review the Chinese plan as the semantic source of truth.

> **For agentic workers:** Execute this plan inline with focused review after each task.

**Goal:** Deliver Milestone 2's local-only public website shell without removing starter authentication or remote tooling.

**Architecture:** Keep the existing React Router application and Better Auth routes. Add public page components and a shared public layout; retain the authenticated TopBar/Profile flow unchanged.

**Tech Stack:** React 19, TypeScript, React Router, Tailwind CSS, shadcn/ui, existing Vite/Hono starter.

## Global Constraints

- Do not deploy or change Cloudflare, D1, OAuth, DNS, GoDaddy, or email settings.
- Preserve existing Better Auth, CLI, migration, backup, and deployment code.
- Use Cloudflare-Ankit as provisional visible branding and `fitoa.net` only as the confirmed development-domain reference.
- Do not invent business claims, pricing, testimonials, legal identity, or contact details.
- Keep English and Chinese project documentation synchronized when changed.

---

### Task 1: Establish public routing and layout

**Files:**
- Create: `src/react-app/components/PublicLayout.tsx`
- Modify: `src/react-app/App.tsx`

- [ ] Route `/`, `/about`, `/services`, `/contact`, `/privacy`, `/terms`, `/login`, `/signup`, and `/account` through public or existing auth layouts.
- [ ] Preserve `/profile`, password-reset, verification, API, and wildcard behavior until their dedicated milestones.
- [ ] Verify with `npm run build`.

### Task 2: Add provisional public pages

**Files:**
- Create: `src/react-app/pages/public/{Home,About,Services,Contact,Privacy,Terms,NotFound}.tsx`

- [ ] Add accessible headings, concise provisional copy, and clear navigation links.
- [ ] Include no claims beyond the approved provisional scope.
- [ ] Verify public routes in the local Vite/Worker server.

### Task 3: Preserve starter account access

**Files:**
- Modify: `src/react-app/components/TopBar.tsx` only if needed for an Account link.
- Modify: `src/react-app/App.tsx`

- [ ] Keep email/password auth, profile editing, logout, Google configuration, and protected routing intact.
- [ ] Point Account links to the existing protected profile route.
- [ ] Re-run the local email/password and protected-route checks.

### Task 4: Record completion and verify

**Files:**
- Modify: `TASKS.zh-CN.md`
- Modify: `TASKS.md`

- [ ] Mark only verified Milestone 2 items complete.
- [ ] Run `npm run lint`, `npm run build`, and `npm run check`.
- [ ] Inspect `git diff --check` and report any remaining warnings or deviations.
