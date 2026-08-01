import assert from "node:assert/strict";
import test from "node:test";

import { isGoogleOAuthEnabled } from "../src/worker/utils/google-oauth-config.ts";

test("Google OAuth is enabled only when both credentials are non-blank", () => {
	assert.equal(isGoogleOAuthEnabled({}), false);
	assert.equal(isGoogleOAuthEnabled({ GOOGLE_CLIENT_ID: "client-id" }), false);
	assert.equal(isGoogleOAuthEnabled({ GOOGLE_CLIENT_SECRET: "client-secret" }), false);
	assert.equal(
		isGoogleOAuthEnabled({ GOOGLE_CLIENT_ID: " \t ", GOOGLE_CLIENT_SECRET: "client-secret" }),
		false,
	);
	assert.equal(
		isGoogleOAuthEnabled({ GOOGLE_CLIENT_ID: "client-id", GOOGLE_CLIENT_SECRET: " \n " }),
		false,
	);
	assert.equal(
		isGoogleOAuthEnabled({ GOOGLE_CLIENT_ID: " client-id ", GOOGLE_CLIENT_SECRET: " client-secret " }),
		true,
	);
});
