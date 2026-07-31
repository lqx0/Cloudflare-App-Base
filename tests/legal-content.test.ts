import assert from "node:assert/strict";
import test from "node:test";
import {
  draftLegalNotice,
  privacySections,
  termsSections,
} from "../src/react-app/content/legal";

test("legal sample content states its draft status without a client contact", () => {
  assert.equal(
    draftLegalNotice,
    "Draft sample — requires owner and legal review before publication.",
  );
  assert.ok(
    privacySections.some(({ body }) => body.includes("project-specific privacy contact")),
  );
  assert.ok(
    privacySections.some(({ body }) => body.includes("authorized deletion")),
  );
  assert.ok(termsSections.some(({ body }) => body.includes("provisional")));
});
