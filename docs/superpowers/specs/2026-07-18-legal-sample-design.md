# Milestone 4: Legal and data sample design

## Purpose

Provide English Privacy and Terms webpage samples for Cloudflare-Ankit. They are for future client review only and are not legal advice, final policies, or public commitments.

## Scope

- Replace the existing short Privacy and Terms placeholders with structured English samples.
- Display this notice prominently on both pages: `Draft sample — requires owner and legal review before publication.`
- Add no API, database field, cookie mechanism, analytics service, email service, or remote configuration.
- Retain the existing `/privacy` and `/terms` routes and public-page layout.

## Privacy sample content

1. State the account information collected: name, email address, optional avatar, and technical data required for authentication and sessions.
2. State the purposes: account operation, security, support, and necessary communication.
3. State retention: until authorized deletion, a valid privacy or legal request, or an approved policy change.
4. Direct access, correction, and deletion requests to `info@fitoa.net`.
5. Do not invent commitments about payments, marketing tracking, cookies, third-party sharing, addresses, governing law, or regulatory compliance.

## Terms sample content

1. State that the website and service content remain provisional samples pending client confirmation.
2. State that account users should provide accurate information, protect login credentials, and not misuse the service.
3. State that service scope, fees, liability, and disputes require owner and legal review before publication.
4. Provide `info@fitoa.net` as the placeholder general-policy contact.

## Implementation and verification

- Extend the Privacy and Terms React content in the existing `Pages.tsx` file without changing public routes.
- Use existing semantic headings and paragraph elements; add no unverifiable legal claims.
- Update Milestone 4 status in `TASKS.md` and `TASKS.zh-CN.md`.
- Run lint, build, the existing navigation test, and local HTTP route checks.

## Explicit limitations

- `info@fitoa.net` is a development-stage display address only; this milestone does not configure delivery, forwarding, DNS, or an email service.
- Publication, domain configuration, and formal legal review still need separate explicit authorization.
