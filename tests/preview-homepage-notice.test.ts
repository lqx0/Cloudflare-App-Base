import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("homepage makes clear that all Preview data is test data and may be cleared at any time", async () => {
	const home = await readFile("src/react-app/pages/Home.tsx", "utf8");

	assert.match(
		home,
		/Preview environment: all data is test data and may be cleared at any time\. Do not rely on it for storage\./,
	);
});
