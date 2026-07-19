import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("accounts schema contains Better Auth OAuth token metadata columns", async () => {
	const [migration, databaseTypes] = await Promise.all([
		readFile("migrations/0003_add_better_auth_oauth_token_columns.sql", "utf8"),
		readFile("src/worker/types/database.ts", "utf8"),
	]);

	assert.match(migration, /ADD COLUMN idToken TEXT/);
	assert.match(migration, /ADD COLUMN refreshTokenExpiresAt INTEGER/);
	assert.match(databaseTypes, /idToken: string \| null/);
	assert.match(databaseTypes, /refreshTokenExpiresAt: number \| null/);
});
