import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("successful sign-up navigates to the profile settings page", async () => {
	const signUp = await readFile("src/react-app/pages/auth/SignUp.tsx", "utf8");

	assert.match(signUp, /navigate\("\/profile"\)/);
});

test("the authenticated homepage uses the existing account top bar", async () => {
	const app = await readFile("src/react-app/App.tsx", "utf8");

	assert.match(app, /path="\/"[\s\S]*shouldShowTopBar[\s\S]*<TopBar>[\s\S]*<PublicHome \/>[\s\S]*<\/TopBar>/);
});
