# Cloudflare-App-Base

Cloudflare-App-Base is a reusable application foundation derived from a Cloudflare full-stack starter. It preserves the shared authentication, database, email, environment, CLI, testing, and deployment-readiness capabilities needed by future projects.

See [VISION.md](VISION.md) for the purpose, vision, and branch policy.

## Technology foundation

- React 19, TypeScript, Vite, and React Router
- Tailwind CSS and shadcn/ui
- Hono on Cloudflare Workers
- Cloudflare D1, Kysely, and `kysely-d1`
- Better Auth email/password authentication and Google OAuth capability
- email provider adapters
- local, preview, and production configuration with Wrangler tooling
- database migration, backup, restore, seed, time travel, and user-management CLI tools

Required Node.js version: `>=22.15.0 <23`.

## Usage

1. Keep `main` as the stable reusable foundation.
2. Create `project/<name>` from `main`.
3. Replace branding, domains, pages, legal content, data models, and remote resource names in the project branch.
4. Return genuinely reusable fixes and improvements to `main`.

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

Review initialization prompts before running them. Local development must not connect to production by default.

## Main branch boundaries

- Do not include a specific client or project's requirements.
- Do not add speculative business data models.
- Preserve working starter infrastructure.
- Do not remove deployment, secret, remote database, email, or CLI capabilities merely because executing them is not currently authorized.
- Do not perform remote deployments, migrations, secret synchronization, OAuth, DNS, email, paid, or destructive operations without specific authorization.

## Documentation

`README`, `VISION`, `SPEC`, `ARCHITECTURE`, `TASKS`, and `AGENTS` have paired English and Chinese files. Confirm the Chinese meaning first, synchronize English, and review both for structural and semantic consistency.

## History

The former Cloudflare-Ankit state is preserved on `archive/cloudflare-ankit-20260801`. Historical design and plan documents remain unchanged as accurate records of earlier work.

## License

The upstream starter is MIT licensed. Preserve the required copyright and license notice in source distributions or substantial copies.
