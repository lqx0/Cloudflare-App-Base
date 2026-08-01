import assert from "node:assert/strict";
import test from "node:test";
import { getAuthBaseURL } from "../src/worker/middleware/auth-base-url";

test("local auth trusts the origin used to reach the development server", () => {
	assert.equal(getAuthBaseURL("http://127.0.0.1:5173/api/auth/sign-up/email", "local"), "http://127.0.0.1:5173");
	assert.equal(getAuthBaseURL("http://localhost:5173/api/auth/sign-up/email", "local"), "http://localhost:5173");
});

test("an explicit app base URL still overrides the request origin", () => {
	assert.equal(getAuthBaseURL("http://127.0.0.1:5173/api/auth/sign-up/email", "local", "https://configured.example"), "https://configured.example");
});
