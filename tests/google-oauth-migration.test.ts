import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the account schema stores the OAuth token fields Better Auth writes", async () => {
	const migration = await readFile("migrations/0004_add_oauth_account_tokens.sql", "utf8");
	const databaseTypes = await readFile("src/worker/types/database.ts", "utf8");

	assert.match(migration, /ALTER TABLE accounts ADD COLUMN idToken TEXT/);
	assert.match(migration, /ALTER TABLE accounts ADD COLUMN refreshTokenExpiresAt INTEGER/);
	assert.match(databaseTypes, /idToken: string \| null/);
	assert.match(databaseTypes, /refreshTokenExpiresAt: number \| null/);
});
