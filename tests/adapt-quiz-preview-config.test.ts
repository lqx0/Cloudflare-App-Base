import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { validatePreviewRemoteConfig } from "../bin/preview-remote-config.ts";

const readyPreviewConfig = `
[env.preview]
name = "adaptquiz"
routes = [
  { pattern = "quiz.fitoa.net", custom_domain = true }
]

[env.preview.vars]
ENVIRONMENT = "preview"
EMAIL_PROVIDER = "resend"
APP_BASE_URL = "https://quiz.fitoa.net"

[[env.preview.d1_databases]]
binding = "DB"
database_name = "adaptquiz"
database_id = "123e4567-e89b-42d3-a456-426614174000"
`;

test("accepts only a ready, isolated aDaptQuiz Preview configuration", () => {
	assert.doesNotThrow(() => validatePreviewRemoteConfig(readyPreviewConfig));
});

test("blocks Preview before any remote action when project resource values are unresolved", () => {
	const unresolved = readyPreviewConfig
		.replace("123e4567-e89b-42d3-a456-426614174000", "REPLACE_WITH_ADAPTQUIZ_PREVIEW_D1_DATABASE_ID")
		.replace("https://quiz.fitoa.net", "REPLACE_WITH_ADAPTQUIZ_PREVIEW_URL");

	assert.throws(
		() => validatePreviewRemoteConfig(unresolved),
		/Preview remote configuration is not ready:[\s\S]*database_id[\s\S]*APP_BASE_URL/,
	);
});

test("rejects a stale workers.dev auth URL or a missing aDaptQuiz custom-domain route", () => {
	assert.throws(
		() =>
			validatePreviewRemoteConfig(
				readyPreviewConfig.replace("https://quiz.fitoa.net", "https://adaptquiz.example-account.workers.dev"),
			),
		/APP_BASE_URL/,
	);

	assert.throws(
		() =>
			validatePreviewRemoteConfig(
				readyPreviewConfig.replace(/routes = \[[\s\S]*?\]\n\n/, ""),
			),
		/custom-domain route/,
	);
});

test("the checked-in remote test configuration uses the created adaptquiz resource", async () => {
	const checkedInConfig = await readFile("wrangler.toml", "utf8");
	assert.doesNotThrow(() => validatePreviewRemoteConfig(checkedInConfig));
});

test("rejects shared base Worker and D1 resources", () => {
	const shared = readyPreviewConfig
		.replace('name = "adaptquiz"', 'name = "cloudflare-app-base"')
		.replace('database_name = "adaptquiz"', 'database_name = "cloudflare-app-base"');

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
