import assert from "node:assert/strict";
import test from "node:test";
import {
  draftLegalNotice,
  privacySections,
  termsSections,
} from "../src/react-app/content/legal";

test("privacy content states the aDaptQuiz disclosure boundary", () => {
  assert.equal(
    draftLegalNotice,
    "Prototype privacy information — final legal review is required before production publication.",
  );
  assert.ok(
    privacySections.some(({ body }) => body.includes("not saved")),
  );
  assert.ok(
    privacySections.some(({ body }) => body.includes("Resend")),
  );
  assert.ok(termsSections.some(({ body }) => body.includes("provisional")));
});
