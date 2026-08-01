import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("administrator pages are add/list only and explain submitted copies", async () => {
	const form = await readFile("src/react-app/features/admin/components/QuestionForm.tsx", "utf8");
	const list = await readFile("src/react-app/features/admin/components/QuestionList.tsx", "utf8");
	const notice = await readFile("src/react-app/features/admin/components/AdminSubmissionsNotice.tsx", "utf8");
	assert.match(form, /Add question/);
	assert.doesNotMatch(list, />Edit<|>Delete<|Deactivate/);
	assert.match(notice, /configured administrator mailbox/);
	assert.match(notice, /Self-test results that users do not send are never available/);
});
