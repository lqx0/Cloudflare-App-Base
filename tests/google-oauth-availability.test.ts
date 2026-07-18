import assert from "node:assert/strict";
import test from "node:test";
import { hasGoogleOAuthCredentials } from "../src/worker/utils/google-oauth";

test("enables Google OAuth only when both credentials contain non-whitespace values", () => {
	assert.equal(
		hasGoogleOAuthCredentials({
			GOOGLE_CLIENT_ID: "client-id",
			GOOGLE_CLIENT_SECRET: "client-secret",
		}),
		true,
	);
	assert.equal(
		hasGoogleOAuthCredentials({
			GOOGLE_CLIENT_ID: "   ",
			GOOGLE_CLIENT_SECRET: "client-secret",
		}),
		false,
	);
	assert.equal(
		hasGoogleOAuthCredentials({
			GOOGLE_CLIENT_ID: "client-id",
			GOOGLE_CLIENT_SECRET: "\t",
		}),
		false,
	);
});
