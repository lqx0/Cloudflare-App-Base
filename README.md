# Cloudflare-Ankit

Cloudflare-Ankit is the temporary name of a Cloudflare-hosted business website with user accounts. The name, branding, and business content will be replaced when the client's formal identity is confirmed.

## SEO limitation

This React/Vite application updates route metadata after JavaScript runs. Crawlers that do not execute JavaScript may see only the initial HTML; SSR or prerendering should be evaluated later only with evidence and approval.

- Development domain: `fitoa.net`
- Domain registrar: GoDaddy
- Project foundation: `https://github.com/lqx0/cloudflare-fullstack-starter`

## Preservation rule

Use the starter as the baseline. Preserve its existing working behavior unless it materially conflicts with an approved requirement, creates a security/privacy issue, blocks Phase 1 delivery, or the user explicitly requests a change.

Do not remove existing deployment, remote database, backup, restore, OAuth, email, CLI, or secret-management capabilities merely because executing them currently requires permission.

## Phase 1

Phase 1 includes:

- Business home page
- About page
- Product or service presentation
- Contact information
- Email/password registration and login
- Google sign-in capability
- Protected account/profile page
- Basic profile editing
- Privacy Policy
- Terms and Conditions
- Basic SEO
- Responsive design
- Local development and deployment preparation

Phase 1 excludes:

- Shopping cart, checkout, payments
- Orders, inventory, shipping
- Product administration
- Merchant or user-management dashboard
- User data export UI
- Appointment booking
- Multi-tenancy
- Astro or a second frontend application

## Existing starter technology

Keep the starter's existing stack and tooling:

- React, TypeScript, Vite, React Router
- Tailwind CSS and shadcn/ui
- Hono on Cloudflare Workers
- Cloudflare D1
- Kysely
- Better Auth
- Email/password authentication
- Verification-link and password-reset hooks
- Google OAuth support
- Local, preview, and production environments
- Database migration, backup, restore, seed, and time-travel tools
- CLI user administration
- Cloudflare binding type generation
- Deployment and secret-sync scripts

The starter currently requires Node.js `>=22.15.0 <23`.

## Authentication policy

- Preserve the existing Better Auth implementation.
- Preserve email/password sign-up and sign-in.
- Preserve secure sessions and protected routes.
- Preserve Google OAuth support, but do not create credentials without approval.
- Preserve verification-link and password-reset capabilities.
- Do not replace the existing verification-link flow with a custom numeric OTP flow in Phase 1.
- When no email provider is configured, preserve the starter's current local/development behavior.
- Keep the existing account-deletion implementation and CLI capability, but hide or disable the ordinary user-facing delete-account action during Phase 1.
- Do not delete users without explicit authorization.

## User data

Collect only the minimum account information:

- Name
- Email
- Optional profile image
- Email verification status
- Created and updated timestamps

Do not add residential address, date of birth, identity documents, payment data, or other sensitive profile fields.

Email is a unique account identity.

Account data is retained indefinitely until deleted by an authorized administrator, removed in response to a valid legal/privacy request, or changed by a future retention policy.

Phase 1 does not include a browser-based user list or data export interface.

## Routes

Recommended routes:

```text
/
about
products
products/:slug
contact
login
register
account
privacy
terms
api/*
```

Canonical production hostname:

```text
https://fitoa.net
```

When remote configuration is approved, `www.fitoa.net` should redirect permanently to `fitoa.net`.

## SEO

Public pages should support:

- Unique titles and descriptions
- Canonical URLs
- Open Graph metadata
- Social preview image
- `robots.txt`
- `sitemap.xml`
- Semantic HTML
- Logical headings
- Image alt text
- Internal links
- Correct 404/noindex behavior

Do not invent final business claims or structured-data facts.

Retain React/Vite for Phase 1. Do not introduce Astro without evidence that it is needed.

## Domain email

Desired address:

```text
info@fitoa.net
```

Preferred approach:

1. Check whether Zoho Mail's free custom-domain plan is available and suitable.
2. If approved and available, use it as a real mailbox for sending and receiving as `info@fitoa.net`.
3. Otherwise, Cloudflare Email Routing may be used as an inbound-forwarding fallback only.
4. Gmail or Outlook.com may receive forwarded mail, but they are not by themselves full custom-domain mailbox services.
5. Do not configure email or DNS without explicit approval.

Authentication emails are separate from the human business mailbox. Preserve the starter's email-provider adapter.

## Local development

```bash
npm install
npm run init
npm run db:migrate
npm run dev
npm run lint
npm run build
npm run check
```

Review initialization prompts before running `npm run init`. Use local resources only during the first Codex session.

## Remote-operation restriction

Without explicit approval for the exact operation, do not:

- Deploy preview or production
- Create or modify remote Workers or D1 databases
- Apply preview or production migrations
- Synchronize remote secrets
- Create Google OAuth credentials
- Modify GoDaddy nameservers or Cloudflare DNS
- Configure domain email
- Create paid resources
- Delete remote resources

Keeping an existing capability is not authorization to execute it.

## Documentation

Default Markdown filenames are English:

- `README.md`
- `SPEC.md`
- `ARCHITECTURE.md`
- `TASKS.md`
- `AGENTS.md`

Chinese companion files use `.zh-CN.md`.

Both versions must be maintained together. Internally, confirm decisions in Chinese meaning first, then synchronize English. Do not place language-precedence notices in the public document bodies.

## License

The upstream starter is MIT licensed. Preserve its required copyright and license notice in source distributions or substantial copies. No front-end attribution is required.
