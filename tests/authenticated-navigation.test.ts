import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("email sign-in navigates from the successful response instead of a fetch lifecycle hook", async () => {
	const loginForm = await readFile("src/react-app/components/auth/LoginForm.tsx", "utf8");

	assert.match(loginForm, /const result = await authClient\.signIn\.email\(\{\s*email,\s*password,\s*\}\);/);
	assert.match(loginForm, /else if \(result\.data\) \{\s*onSuccess\?\.\(\);\s*\}/);
	assert.doesNotMatch(loginForm, /fetchOptions:\s*\{\s*onSuccess:/);
});
