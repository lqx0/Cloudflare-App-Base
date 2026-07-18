# GitHub CI foundation design

Add a minimal GitHub Actions workflow that runs on pushes to `main` and pull requests, using Node 22 to run `npm ci`, focused project tests, `npm run lint`, and `npm run build`.

It does not run `npm run check` because that includes a Wrangler dry-run. The workflow does not deploy, require Cloudflare credentials, read secrets, or access D1.

The workflow verifies repeatable local build quality only and retains existing deploy scripts for later explicit authorization.
