# Cloudflare-Ankit Architecture

## 1. Baseline

Cloudflare-Ankit adapts `lqx0/cloudflare-fullstack-starter`.

Follow the starter's architecture rather than replacing it.

Current baseline:

- React 19, TypeScript, Vite, React Router
- Tailwind CSS, shadcn/ui
- Hono, Cloudflare Workers, Cloudflare Vite Plugin
- Cloudflare D1
- Kysely and `kysely-d1`
- Better Auth and bcryptjs
- Email provider adapters
- Wrangler and multi-environment tooling
- Node.js `>=22.15.0 <23`

## 2. High-level design

```text
Browser
  |
  v
Cloudflare Worker + Static Assets
  |
  +-- React public pages
  +-- React protected account pages
  +-- Hono /api/*
          |
          +-- Better Auth
          +-- Auth middleware
          +-- Kysely
          +-- D1
          +-- Optional email adapter
```

Use one application and same-origin routing.

Do not split the public site and account app in Phase 1.

## 3. Preserve-first workflow

1. Run and understand the original starter.
2. Record its working behavior.
3. Create a baseline commit or tag if appropriate.
4. Make focused changes.
5. Do not remove working features merely because they are currently hidden.
6. Do not rewrite auth or database infrastructure without evidence.

## 4. Frontend boundaries

Follow the current structure. Introduce feature folders only when real code needs them.

Possible direction:

```text
src/react-app/
├── app/
├── features/
│   ├── public-site/
│   ├── auth/
│   ├── account/
│   └── products/
├── shared/
└── main.tsx
```

Public-site responsibilities: Home, About, Products/Services, Contact, Privacy, Terms, SEO, navigation, footer.

Auth responsibilities: sign-up, sign-in, optional Google button, password reset, verification-link UI, route protection.

Account responsibilities: profile display and safe edits. Hide or disable the Phase 1 delete-account action.

## 5. Worker boundaries

Keep the starter's Hono and Better Auth integration.

Only extract routes/services/repositories/schemas when actual complexity justifies it.

Do not perform unrelated refactoring in the first setup session.

## 6. Authentication flow

Email/password:

```text
credentials -> Better Auth -> hash/validate -> D1 -> session cookie -> account page
```

Google:

```text
Google selection -> Better Auth provider -> callback -> account create/link -> session
```

Verification:

```text
mail unavailable -> preserve starter local fallback
mail configured -> existing verification URL -> email adapter -> verified account
```

Do not replace verification links with numeric OTP in Phase 1.

## 7. Database

Keep the starter's Better Auth tables and migrations.

Typical models:

- users
- accounts
- sessions
- verifications

Email is unique for account identity.

Do not create a separate `registrations` table.

Do not add product, order, inventory, payment, or address models.

## 8. CLI and administration

Preserve existing user and database CLI functions, including list, inspect, create, edit, role management, delete, migration, backup, restore, seed, and time travel.

Do not weaken CLI authentication.

Do not run remote commands without approval.

Phase 1 does not add a browser admin dashboard.

## 9. SEO

Retain React/Vite.

Use the simplest compatible route-aware metadata or build-time strategy already suitable for the starter. Essential metadata should not depend on delayed API data.

Do not introduce Astro, Next.js, or a second application in Phase 1.

## 10. Email

Human business mailbox and authentication email are separate concerns.

- Human mailbox: preferably Zoho Mail free custom-domain if available and approved.
- Fallback inbound forwarding: Cloudflare Email Routing.
- Authentication email: preserve starter adapter; enable only after provider approval.

## 11. Environments

Keep local, preview, production, and test where supported.

Local work must not default to production resources.

First Codex session: local only.

## 12. Documentation workflow

English default and Chinese companion files must remain structurally aligned.

Process:

1. Confirm intended meaning in Chinese.
2. Update Chinese.
3. Synchronize English.
4. Review semantic consistency.
5. Do not place language-precedence notices in public document text.

## 13. Future extension

Later work may add product models, R2 images, cart, checkout, payments, webhooks, orders, inventory, merchant admin, Queues, or Durable Objects when justified.

Do not prebuild these in Phase 1.
