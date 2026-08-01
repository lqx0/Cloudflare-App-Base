import assert from "node:assert/strict";
import test from "node:test";
import { buildQuizCopyEmail, getQuizEmailReadiness } from "../src/worker/quiz/email";

const results = [{ id: "f", type: "free_text" as const, prompt: "<Explain>", options: null, userAnswer: "<Mine>", correctAnswer: "Reference" }];

test("builds escaped HTML and complete plain text", () => {
	const email = buildQuizCopyEmail({ user: { name: "<Tom>", email: "tom@example.com" }, results, sentAt: new Date("2026-08-01T00:00:00Z") });
	assert.doesNotMatch(email.html, /<Tom>|<Mine>|<Explain>/);
	assert.match(email.html, /&lt;Tom&gt;/);
	assert.match(email.text, /tom@example\.com/);
	assert.match(email.text, /Reference/);
});

test("requires every Resend delivery setting", () => {
	assert.equal(getQuizEmailReadiness({ EMAIL_PROVIDER: "resend", EMAIL_API_KEY: "key", RECRUIT_QUIZ_RECIPIENT_EMAIL: "admin@gmail.com", fromAddress: "quiz@mail.fitoa.net" }), true);
	assert.equal(getQuizEmailReadiness({ EMAIL_PROVIDER: "resend", EMAIL_API_KEY: "", RECRUIT_QUIZ_RECIPIENT_EMAIL: "admin@gmail.com", fromAddress: "quiz@mail.fitoa.net" }), false);
	assert.equal(getQuizEmailReadiness({ EMAIL_PROVIDER: "resend", EMAIL_API_KEY: "key", RECRUIT_QUIZ_RECIPIENT_EMAIL: "", fromAddress: "quiz@mail.fitoa.net" }), false);
});
