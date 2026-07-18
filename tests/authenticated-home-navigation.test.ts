import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("successful sign-up navigates to the profile settings page", async () => {
	const signUp = await readFile("src/react-app/pages/auth/SignUp.tsx", "utf8");

	assert.match(signUp, /navigate\("\/profile"\)/);
});

test("the sign-in link on the sign-up page opens the login route", async () => {
	const signUp = await readFile("src/react-app/pages/auth/SignUp.tsx", "utf8");

	assert.match(signUp, /Already have an account\?[\s\S]*<Link to="\/login"/);
});

test("the sign-in link on the forgot-password page opens the login route", async () => {
	const forgotPassword = await readFile("src/react-app/pages/auth/ForgotPassword.tsx", "utf8");

	assert.match(forgotPassword, /Remembered your password\?[\s\S]*<Link to="\/login"/);
});

test("the back-to-sign-in link on the reset-password page opens the login route", async () => {
	const resetPassword = await readFile("src/react-app/pages/auth/ResetPassword.tsx", "utf8");

	assert.match(resetPassword, /<Link to="\/login"[\s\S]*Back to sign in/);
});

test("the reset-password fallback redirects unauthenticated users to the login route", async () => {
	const resetPassword = await readFile("src/react-app/pages/auth/ResetPassword.tsx", "utf8");

	assert.match(resetPassword, /Fallback: show success and redirect to login[\s\S]*navigate\("\/login"\)/);
});

test("the homepage uses the shared site layout for every session state", async () => {
	const app = await readFile("src/react-app/App.tsx", "utf8");

	assert.match(app, /path="\/"[\s\S]*<SiteLayout><PublicHome \/><\/SiteLayout>/);
	assert.doesNotMatch(app, /shouldShowTopBar|<TopBar>/);
});
