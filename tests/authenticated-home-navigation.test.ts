import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("successful sign-up navigates to the profile settings page", async () => {
	const signUp = await readFile("src/react-app/pages/auth/SignUp.tsx", "utf8");

	assert.match(signUp, /navigate\("\/profile"\)/);
});

test("the homepage uses the shared site layout for every session state", async () => {
	const app = await readFile("src/react-app/App.tsx", "utf8");

	assert.match(app, /path="\/"[\s\S]*<SiteLayout><PublicHome \/><\/SiteLayout>/);
	assert.doesNotMatch(app, /shouldShowTopBar|<TopBar>/);
});
