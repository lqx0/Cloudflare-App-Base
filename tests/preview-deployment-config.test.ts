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

test("environment build runner selects the Windows npx executable when necessary", async () => {
	const buildScript = await readFile("bin/build.ts", "utf8");

	assert.match(buildScript, /process\.platform === "win32" \? "npx\.cmd" : "npx"/);
	assert.match(buildScript, /shell: process\.platform === "win32"/);
});
