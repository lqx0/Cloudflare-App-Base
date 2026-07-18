import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("preview deployment builds with the Cloudflare preview environment and deploys it explicitly", async () => {
	const packageJson = JSON.parse(await readFile("package.json", "utf8")) as {
		scripts: Record<string, string>;
	};

	assert.equal(packageJson.scripts["build:preview"], "tsx bin/build.ts preview");
	assert.match(packageJson.scripts["deploy:preview"], /wrangler deploy --env preview/);
});

test("preview configuration uses the deployed workers.dev origin for Better Auth", async () => {
	const wranglerConfig = await readFile("wrangler.toml", "utf8");

	assert.match(
		wranglerConfig,
		/\[env\.preview\.vars\][\s\S]*APP_BASE_URL\s*=\s*"https:\/\/cloudflare-ankit-preview\.lqixv\.workers\.dev"/,
	);
});

test("preview disables email verification until a usable mail sender is configured", async () => {
	const [wranglerConfig, authMiddleware] = await Promise.all([
		readFile("wrangler.toml", "utf8"),
		readFile("src/worker/middleware/auth.ts", "utf8"),
	]);

	assert.match(wranglerConfig, /\[env\.preview\.vars\][\s\S]*AUTH_EMAILS_ENABLED\s*=\s*"false"/);
	assert.match(authMiddleware, /AUTH_EMAILS_ENABLED/);
});

test("environment build runner selects the Windows npx executable when necessary", async () => {
	const buildScript = await readFile("bin/build.ts", "utf8");

	assert.match(buildScript, /process\.platform === "win32" \? "npx\.cmd" : "npx"/);
	assert.match(buildScript, /shell: process\.platform === "win32"/);
});

test("remote tooling invokes the repository-pinned Wrangler executable", async () => {
	const [secretSync, databaseCli] = await Promise.all([
		readFile("bin/sync-secrets.ts", "utf8"),
		readFile("bin/db.ts", "utf8"),
	]);

	assert.match(secretSync, /node_modules", "wrangler", "bin", "wrangler\.js/);
	assert.match(databaseCli, /node_modules", "wrangler", "bin", "wrangler\.js/);
});

test("worker authentication reads an explicit Better Auth secret binding", async () => {
	const [authMiddleware, environmentTypes] = await Promise.all([
		readFile("src/worker/middleware/auth.ts", "utf8"),
		readFile("src/worker/types/env.ts", "utf8"),
	]);

	assert.match(authMiddleware, /secret: c\.env\.BETTER_AUTH_SECRET/);
	assert.match(environmentTypes, /BETTER_AUTH_SECRET\?: string/);
});
