import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("SiteLayout composes shared header and footer components", async () => {
	const siteLayout = await readFile("src/react-app/components/SiteLayout.tsx", "utf8");
	const siteHeader = await readFile("src/react-app/components/SiteHeader.tsx", "utf8");
	const siteFooter = await readFile("src/react-app/components/SiteFooter.tsx", "utf8");
	const siteBrand = await readFile("src/react-app/components/SiteBrand.tsx", "utf8");
	const primaryNavigation = await readFile("src/react-app/components/PrimaryNavigation.tsx", "utf8");
	const siteHeaderActions = await readFile("src/react-app/components/SiteHeaderActions.tsx", "utf8");

	assert.match(siteLayout, /export function SiteLayout/);
	assert.match(siteLayout, /import \{ SiteHeader \} from "\.\/SiteHeader"/);
	assert.match(siteLayout, /import \{ SiteFooter \} from "\.\/SiteFooter"/);
	assert.match(siteLayout, /<SiteHeader \/>/);
	assert.match(siteLayout, /<SiteFooter \/>/);
	assert.doesNotMatch(siteLayout, /<header|<footer/);
	assert.match(siteHeader, /import \{ SiteBrand \} from "\.\/SiteBrand"/);
	assert.match(siteHeader, /import \{ PrimaryNavigation \} from "\.\/PrimaryNavigation"/);
	assert.match(siteHeader, /import \{ SiteHeaderActions \} from "\.\/SiteHeaderActions"/);
	assert.match(siteHeader, /<SiteBrand \/>/);
	assert.match(siteHeader, /<PrimaryNavigation \/>/);
	assert.match(siteHeader, /<SiteHeaderActions \/>/);
	assert.match(siteBrand, /<Logo/);
	assert.match(primaryNavigation, /publicNavigation\.map/);
	assert.match(siteHeaderActions, /to="\/login"/);
	assert.match(siteHeaderActions, /to="\/signup"/);
	assert.match(siteHeaderActions, /<ModeToggle \/>/);
	assert.match(siteHeaderActions, /<UserMenu \/>/);
	assert.match(siteFooter, /<footer/);
});

test("all application routes use SiteLayout instead of separate public and account shells", async () => {
	const app = await readFile("src/react-app/App.tsx", "utf8");

	assert.match(app, /import \{ SiteLayout \} from "@\/components\/SiteLayout"/);
	assert.doesNotMatch(app, /import \{ PublicLayout \}/);
	assert.doesNotMatch(app, /import \{ TopBar \}/);
	assert.match(app, /<SiteLayout>[\s\S]*<PublicHome \/>[\s\S]*<\/SiteLayout>/);
	assert.match(app, /<SiteLayout>[\s\S]*<AuthOverlay \/>[\s\S]*<\/SiteLayout>/);
	assert.match(app, /<SiteLayout>[\s\S]*<Profile \/>[\s\S]*<\/SiteLayout>/);
});

test("authentication pages retain their cards without taking over the viewport", async () => {
	const authPageFiles = [
		"src/react-app/components/auth/AuthOverlay.tsx",
		"src/react-app/pages/auth/SignUp.tsx",
		"src/react-app/pages/auth/ForgotPassword.tsx",
		"src/react-app/pages/auth/ResetPassword.tsx",
		"src/react-app/pages/auth/VerifyEmail.tsx",
	];

	for (const file of authPageFiles) {
		const source = await readFile(file, "utf8");
		assert.doesNotMatch(source, /fixed inset-0/);
		assert.doesNotMatch(source, /min-h-screen/);
	}
});

test("the homepage uses the same page heading wrapper as the informational pages", async () => {
	const pages = await readFile("src/react-app/pages/public/Pages.tsx", "utf8");

	assert.match(
		pages,
		/export function PublicHome\(\) \{[\s\S]*?<Page title="Practice clearly\. Share only when you choose\.">/,
	);
});
