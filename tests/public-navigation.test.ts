import assert from "node:assert/strict";
import test from "node:test";
import { publicNavigation } from "../src/react-app/lib/public-navigation";

test("exposes the approved public navigation routes", () => {
	assert.deepEqual(publicNavigation, [
		{ href: "/", label: "Home" },
		{ href: "/quiz", label: "Quiz" },
	]);
});
