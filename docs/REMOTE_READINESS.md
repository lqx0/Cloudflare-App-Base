# Remote Enablement Readiness

This document raises two owner-authorized workstreams to the next phase's highest priority. It records local readiness and execution prerequisites only; it does not authorize any remote operation.

## Priority 1: Google OAuth credentials and enablement

### Local implementation already in place

- `config.auth.enableGoogleAuth` is enabled.
- The Worker registers the Google provider only when both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are present; email/password sign-in remains available when either is missing.
- `/api/auth/capabilities` determines whether the login page shows the Google button.
- Better Auth's default callback path is `/api/auth/callback/google`; its base URL comes from `APP_BASE_URL`.

### Owner input or confirmation required before execution

1. Ownership of the Google Cloud project and completed OAuth consent-screen decisions.
2. A Web application OAuth Client ID and Client Secret. Secrets may only be written to environment files or Cloudflare Secrets through an approved secure channel; never paste them into Git, task documents, or chat.
3. Exact authorized redirect URIs for each environment to enable:
   - Preview: `https://cloudflare-ankit-preview.lqixv.workers.dev/api/auth/callback/google`
   - Production: `https://<confirmed-canonical-domain>/api/auth/callback/google`
4. Whether to enable OAuth in Preview, Production, or both, and whether sign-up should accept any Google account. No Workspace restriction or additional Google scopes will be added by default.
5. Explicit authorization to synchronize `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to the corresponding environment.

### Verification after approval

1. Confirm Worker identity and target environment, using only the approved environment.
2. Synchronize credentials safely without retaining values in command output.
3. Verify that the capabilities API reports Google available and complete one login-page callback flow.
4. Confirm that account linking for a new user or a verified same-email user follows existing Better Auth behavior and that email/password sign-in has not regressed.
5. Run the full test suite, lint, and build; record the deployed URL, command results, and Git state.

## Priority 2: domain, email, Preview/Production configuration, and deployment

### Current local state

- Preview has its own Worker, D1 database, and `APP_BASE_URL`; its current URL is `https://cloudflare-ankit-preview.lqixv.workers.dev`.
- Production still has a placeholder D1 ID and no `APP_BASE_URL`. It is not deployable until the canonical domain and an existing-or-authorized-new database are decided.
- The sender is still the `noreply@example.com` placeholder. Authentication email is explicitly disabled in Preview and must remain off until a verified sender domain and email approach are approved.
- Existing CI deploys Preview after checks pass on `main`; any merge to `main` must be treated as potentially triggering that deployment.

### Owner input or confirmation required before execution

1. The canonical Production domain, whether `www` permanently redirects to it, and whether the domain is already an active zone in the target Cloudflare account.
2. The Production D1 approach: provide an existing database ID or separately authorize creation of one. Never guess or reuse the Preview ID.
3. Exact Preview and Production `APP_BASE_URL` values, plus the permitted Worker, D1, and domain scope for each environment.
4. The business-email approach: full mailbox service or inbound forwarding only; transactional-email provider, verified sending domain, and sender address. Every DNS, Email Routing, Email Sending, or paid-plan operation needs separate explicit approval.
5. Whether Preview, Production, or both may be deployed. Migration, secret synchronization, CI variables, and rollback bounds also need separate authorization per environment.

### Execution order after approval

1. Confirm account identity and target Worker, D1, and zone without modifying them.
2. Complete the approved subset of domain, email, and OAuth work in Preview first; verify health, email/password login, registration, OAuth callback, and actual email behavior.
3. Only after Preview verification and independent written Production authorization, populate Production configuration and deploy.
4. Use a Worker Custom Domain for the canonical domain when the Worker is the origin; a `www` redirect requires a separate DNS/redirect-rule decision.
5. Record the effective URLs, environments, migration state, verification results, and Git state after release, without exposing Secrets.

## Not authorized by this document

- Creating Google OAuth clients or Cloudflare resources.
- Writing or synchronizing Secrets.
- Changing D1, DNS, Email Routing, Email Sending, domains, or paid subscriptions.
- Preview or Production deploys, remote migrations, deletions, or rollbacks.

## Approved Preview data-reset policy

- All Preview data is test data and may be cleared at any time.
- A reset does not send notifications.
- A reset may clear part or all Preview data, according to the testing need.
- No backup is created by default before a reset.
- No reset is scheduled or automatic. The owner must explicitly authorize each destructive reset, including its target scope; the agent may then carry it out.
