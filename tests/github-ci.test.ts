import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("GitHub CI deploys Preview only after main branch checks pass", async () => {
	const workflow = await readFile(".github/workflows/ci.yml", "utf8");
	assert.match(workflow, /node-version-file: "\.nvmrc"/);
	assert.match(workflow, /npm ci/);
	assert.match(workflow, /tsx --test/);
	assert.match(workflow, /npm run lint/);
	assert.match(workflow, /npm run build/);
	assert.match(workflow, /deploy-preview:/);
	assert.match(workflow, /needs: build-and-lint/);
	assert.match(workflow, /github\.event_name == 'push' && github\.ref == 'refs\/heads\/main'/);
	assert.match(workflow, /npm run build:preview/);
	assert.match(workflow, /npx wrangler deploy --env preview/);
	assert.match(workflow, /CLOUDFLARE_API_TOKEN/);
	assert.match(workflow, /CLOUDFLARE_ACCOUNT_ID/);
	assert.doesNotMatch(workflow, /deploy --env production/);
});
