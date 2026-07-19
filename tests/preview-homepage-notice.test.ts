import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("homepage explains that Preview testing data may be reset", async () => {
	const home = await readFile("src/react-app/pages/Home.tsx", "utf8");

	assert.match(
		home,
		/Preview environment — shared for friends to test\. Features and data may change or be reset during testing\./,
	);
});
