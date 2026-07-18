# Cloudflare-Ankit Tasks

Status:

```text
[ ] Not started
[-] In progress
[x] Completed and verified
[!] Blocked
```

## Milestone 0 — Repository orientation

- [x] Inspect Git status, branch, remotes, and repository tree.
- [x] Determine whether the repository is a clean starter, template-generated project, or modified project.
- [x] Read upstream README, AGENTS, setup documentation, package scripts, lockfile, Wrangler config, migrations, auth code, email adapter, and CLI tooling.
- [x] Confirm Node.js and package-manager requirements.
- [x] Identify working starter features.
- [x] Identify remote and destructive scripts.
- [x] Preserve them, but do not run them.
- [x] Create or merge the English and Chinese document pairs.
- [x] Confirm no secrets are committed.
- [x] Determine that a baseline commit or tag is not appropriate while the Milestone 0–1 changes remain uncommitted.

## Milestone 1 — Local starter verification

- [x] Use Node.js `>=22.15.0 <23`.
- [x] Install dependencies.
- [x] Review initialization prompts before running `npm run init`.
- [x] Configure local-only environment files.
- [x] Generate local secrets if needed.
- [x] Apply local migrations only.
- [x] Start the local app.
- [x] Verify email/password sign-up and sign-in.
- [x] Verify protected account access.
- [x] Verify profile editing.
- [x] Confirm Google OAuth is optional without credentials.
- [x] Confirm verification email is conditional on provider configuration.
- [x] Confirm remote scripts remain present but were not executed.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Run `npm run check`.

Stop after Milestone 1 and report results.

## Milestone 2 — Cloudflare-Ankit public shell

- [x] Replace visible starter branding with temporary Cloudflare-Ankit branding.
- [x] Preserve license notices.
- [x] Add public navigation and footer.
- [x] Add Home, About, Products/Services, Contact, Privacy, Terms, and Not Found.
- [x] Add Login, Register, and Account access.
- [x] Keep the starter theme unless it causes a problem.
- [x] Use simple provisional content.

## Milestone 3 — Authentication adaptation

- [x] Preserve Better Auth email/password flow.
- [x] Preserve sessions and protected routes.
- [x] Preserve Google OAuth configuration.
- [x] Hide Google login cleanly when unconfigured if needed.
- [x] Preserve verification-link and password-reset hooks.
- [x] Do not implement numeric OTP.
- [x] Hide or disable the ordinary user delete-account action.
- [x] Preserve underlying deletion and CLI administration.
- [x] Review authentication error exposure.

## Milestone 4 — Legal and data policy

- [x] Add provisional Privacy and Terms pages.
- [x] Describe collected account fields.
- [x] Describe indefinite retention until authorized deletion or policy change.
- [x] Add privacy-contact placeholders.
- [x] Explain access, correction, and deletion request channels.
- [x] Mark legal content for owner approval.

## Milestone 5 — SEO

- [x] Add route-specific titles and descriptions.
- [x] Add canonical handling and Open Graph metadata.
- [x] Add social image, `robots.txt`, and `sitemap.xml`.
- [x] Add semantic headings, alt text, internal links, and Not Found behavior.
- [x] Record SPA limitations.
- [x] Do not add Astro.

## Milestone 6 — Quality and security

- [x] Review auth error handling.
- [x] Review security headers and CSP.
- [x] Review logs for personal data.
- [x] Review CLI endpoint protection.
- [x] Review `.gitignore` and secret files.
- [x] Review dependency advisories.
- [x] Add focused tests for changed behavior.
- [x] Check accessibility and responsiveness.

## Later milestones — approval required

The following work is now the highest priority for the next phase. Full local readiness is recorded in `docs/REMOTE_READINESS.md`; none of it permits a remote operation until the target environment has explicit approval.

- [!] Priority 1: Google OAuth credentials and remote enablement (awaiting Google Cloud project, redirect URIs, secure credential delivery, and environment-level authorization).
- [!] Priority 2: domain, email, Preview/Production configuration, or deployment (awaiting canonical domain, Production D1, email approach, and authorization for each remote operation).

Still requiring separate approval:

- Creating a Google OAuth client
- Cloudflare Preview or Production deployment
- Domain/DNS/Email Routing/Email Sending configuration
- Any paid or destructive operation

## Phase 2 backlog

- Real business requirements
- Product data and administration
- Cart and checkout
- Payments
- Orders and inventory
- Merchant administration
- Evidence-based reassessment of Astro
