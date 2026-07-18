import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the login overlay sends successful sign-ins to profile settings", async () => {
	const authOverlay = await readFile("src/react-app/components/auth/AuthOverlay.tsx", "utf8");

	assert.match(authOverlay, /onSuccess=\{\(\) => navigate\("\/profile"\)\}/);
});
