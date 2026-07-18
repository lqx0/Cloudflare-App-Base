# Cloudflare-Ankit Product Specification

## 1. Purpose

This document defines the approved Phase 1 scope for Cloudflare-Ankit.

Cloudflare-Ankit and `fitoa.net` are temporary development identifiers. Final business identity, copy, branding, products, and services remain unconfirmed.

## 2. Foundation

Use `lqx0/cloudflare-fullstack-starter`.

Preserve the starter's working implementation by default. Modify it only when there is a material requirement conflict, security/privacy issue, delivery blocker, or explicit instruction.

## 3. Phase 1 objectives

Phase 1 must provide:

1. A simple professional business website.
2. Public business-information pages.
3. Product or service presentation.
4. Email/password registration and login.
5. Google sign-in capability using the starter's existing integration.
6. A protected account area.
7. Basic profile viewing and editing.
8. Privacy and Terms pages.
9. Basic SEO.
10. Responsive and accessible presentation.
11. A clean path toward later e-commerce expansion.
12. Local development without unauthorized remote changes.

## 4. Non-goals

Do not implement product administration, cart, checkout, payments, orders, inventory, shipping, appointments, merchant dashboard, user-list dashboard, export UI, multi-tenancy, Astro, or premature e-commerce database models.

## 5. Public pages

Initial routes:

- Home
- About
- Products or Services
- Optional detail page
- Contact
- Login
- Register
- Account/Profile
- Privacy
- Terms
- Not Found

Use simple provisional Cloudflare-Ankit content until the client provides final material.

Do not invent testimonials, awards, certifications, customer numbers, guarantees, prices, addresses, or legal claims.

## 6. Authentication

### Email/password

Keep the starter's Better Auth flow, password hashing, sessions, protected routes, password-reset hooks, and verification-link hooks.

Email is a unique user identity.

### Email verification

- Initial local development does not require an email provider.
- Preserve the starter's conditional behavior when mail is not configured.
- When a provider is configured later, use the existing verification-link flow.
- Do not implement numeric OTP in Phase 1.

### Google OAuth

- Preserve the existing integration.
- Enable it only when valid credentials are available.
- Missing credentials must not break email/password login.
- Do not create a Google OAuth client without explicit approval.
- Do not build unsafe custom account linking.

### Account deletion

- Preserve the existing deletion implementation and administrator/CLI capability.
- Hide or disable the ordinary user-facing delete-account action during Phase 1.
- Do not delete users without explicit authorization.

## 7. Profile

Minimum profile data:

- Name
- Email
- Optional image
- Verification status
- Created and updated timestamps

Recommended initial editable field: name.

Keep existing safe email/password editing if it already works, but do not expand it without need.

## 8. Data retention and administration

Retain account data until authorized deletion, a valid privacy/legal request, or an approved policy change.

Phase 1 does not include a browser-based user list, export UI, public lookup, or admin dashboard.

Preserve CLI administration, but do not run remote commands without approval.

## 9. SEO

Every public page should support title, description, canonical URL, Open Graph metadata, social image, semantic headings, alt text, internal links, `robots.txt`, `sitemap.xml`, and correct not-found behavior.

Do not add inaccurate structured data.

Retain React/Vite for Phase 1 and record SPA limitations honestly.

## 10. Domain and email

Temporary domain: `fitoa.net`.

Recommended canonical URL: `https://fitoa.net`.

Future redirect: `https://www.fitoa.net` to `https://fitoa.net`.

Desired business mailbox: `info@fitoa.net`.

First evaluate Zoho Mail's free custom-domain availability. Use Cloudflare Email Routing only as an inbound-forwarding fallback. Do not configure DNS or email without approval.

## 11. Remote policy

Keep existing remote-operation scripts, but require explicit approval before any deployment, remote D1 change, remote migration, secret synchronization, OAuth setup, DNS change, email configuration, paid resource, or destructive operation.

The first Codex session is local-only.

## 12. Documentation

Maintain:

```text
README.md / README.zh-CN.md
SPEC.md / SPEC.zh-CN.md
ARCHITECTURE.md / ARCHITECTURE.zh-CN.md
TASKS.md / TASKS.zh-CN.md
AGENTS.md / AGENTS.zh-CN.md
```

Confirm decisions in Chinese meaning first, then synchronize English. Do not add language-precedence notices to public document bodies.

## 13. First-session acceptance

The first Codex session is complete when the repository is inspected, the starter is locally understood, document pairs exist, dependencies install, local setup is verified, existing authentication is tested, lint/build/check are run, no remote resource is changed, and the next local task is reported.
