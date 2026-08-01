import assert from "node:assert/strict"; import { readFile } from "node:fs/promises"; import test from "node:test";
import { handleSendConfirmation } from "../src/react-app/features/quiz/send-confirmation";
test("send copy requires confirmation and explains unavailable delivery", async()=>{const dialog=await readFile("src/react-app/features/quiz/components/SendQuizCopyDialog.tsx","utf8");assert.match(dialog,/Nothing is sent unless you confirm/);assert.match(dialog,/Email delivery is not configured in this prototype/);assert.match(dialog,/Confirm and send/);});

test("a rejected send is handled without closing the retryable dialog", async () => {
	let closed = false;
	await assert.doesNotReject(() => handleSendConfirmation(
		async () => { throw new Error("provider unavailable"); },
		() => { closed = true; },
	));
	assert.equal(closed, false);
});
