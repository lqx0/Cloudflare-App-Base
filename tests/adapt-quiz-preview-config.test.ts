import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { validatePreviewRemoteConfig } from "../bin/preview-remote-config.ts";

const readyPreviewConfig = `
[env.preview]
name = "adaptquiz-preview"

[env.preview.vars]
ENVIRONMENT = "preview"
EMAIL_PROVIDER = "resend"
APP_BASE_URL = "https://adaptquiz-preview.example-account.workers.dev"

[[env.preview.d1_databases]]
binding = "DB"
database_name = "adaptquiz-preview"
database_id = "123e4567-e89b-42d3-a456-426614174000"
`;

test("accepts only a ready, isolated aDaptQuiz Preview configuration", () => {
	assert.doesNotThrow(() => validatePreviewRemoteConfig(readyPreviewConfig));
});

test("blocks Preview before any remote action when project resource values are unresolved", () => {
	const unresolved = readyPreviewConfig
		.replace("123e4567-e89b-42d3-a456-426614174000", "REPLACE_WITH_ADAPTQUIZ_PREVIEW_D1_DATABASE_ID")
		.replace(
			"https://adaptquiz-preview.example-account.workers.dev",
			"REPLACE_WITH_ADAPTQUIZ_PREVIEW_WORKERS_DEV_URL",
		);

	assert.throws(
		() => validatePreviewRemoteConfig(unresolved),
		/Preview remote configuration is not ready:[\s\S]*database_id[\s\S]*APP_BASE_URL/,
	);
});

test("the checked-in Preview configuration is intentionally blocked until real resources exist", async () => {
	const checkedInConfig = await readFile("wrangler.toml", "utf8");

	assert.throws(
		() => validatePreviewRemoteConfig(checkedInConfig),
		/Preview remote configuration is not ready:[\s\S]*database_id[\s\S]*APP_BASE_URL[\s\S]*No remote action was started/,
	);
});

test("rejects shared base Worker and D1 resources", () => {
	const shared = readyPreviewConfig
		.replace('name = "adaptquiz-preview"', 'name = "cloudflare-app-base"')
		.replace('database_name = "adaptquiz-preview"', 'database_name = "cloudflare-app-base"');

	assert.throws(
		() => validatePreviewRemoteConfig(shared),
		/Preview remote configuration is not ready:[\s\S]*Worker name[\s\S]*D1 database_name/,
	);
});

test("repository Preview entry points run the fail-closed preflight first", async () => {
	const [packageJsonText, secretSync, databaseCli] = await Promise.all([
		readFile("package.json", "utf8"),
		readFile("bin/sync-secrets.ts", "utf8"),
		readFile("bin/db.ts", "utf8"),
	]);
	const packageJson = JSON.parse(packageJsonText) as { scripts: Record<string, string> };

	assert.match(packageJson.scripts["deploy:preview"], /^tsx bin\/preview-remote-config\.ts &&/);
	assert.match(secretSync, /assertPreviewRemoteConfigReady/);
	assert.match(databaseCli, /assertPreviewRemoteConfigReady/);
});
