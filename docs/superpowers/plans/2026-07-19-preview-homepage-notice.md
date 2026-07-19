# Preview Homepage Notice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show a concise Preview testing and possible-data-reset notice on the homepage.

**Architecture:** Keep the homepage as a static React component. Add one text block above the existing welcome message and a filesystem-based Node test that locks down the agreed wording.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Node.js built-in test runner via `tsx`.

## Global Constraints

- Use the exact agreed English copy: `Preview environment — shared for friends to test. Features and data may change or be reset during testing.`
- Do not add automatic deletion, legal-policy content, remote configuration, or new dependencies.
- Keep the existing centered homepage layout.

---

### Task 1: Add the Preview homepage notice

**Files:**

- Create: `tests/preview-homepage-notice.test.ts`
- Modify: `src/react-app/pages/Home.tsx`

**Interfaces:**

- Consumes: the static `Home` React component.
- Produces: homepage markup containing the agreed notice text before the existing welcome text.

- [ ] **Step 1: Write the failing test**

```ts
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx tsx --test tests/preview-homepage-notice.test.ts`

Expected: one failing test because `Home.tsx` does not yet contain the agreed notice.

- [ ] **Step 3: Implement the minimal homepage markup**

Replace the `Home` return body with:

```tsx
<section className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-6 py-16">
	<div className="space-y-3 text-center">
		<p className="text-sm text-muted-foreground">
			Preview environment — shared for friends to test. Features and data may change or be reset during testing.
		</p>
		<p className="text-lg font-semibold text-muted-foreground">Welcome to Your App</p>
	</div>
</section>
```

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `npx tsx --test tests/preview-homepage-notice.test.ts`

Expected: one passing test and zero failures.

- [ ] **Step 5: Run full verification**

Run:

```powershell
npx tsx --test tests/*.test.ts
npm run lint
npm run build
```

Expected: all tests pass, lint exits 0, and build exits 0.

- [ ] **Step 6: Commit the implementation**

```powershell
git add src/react-app/pages/Home.tsx tests/preview-homepage-notice.test.ts
git commit -m "feat: add Preview testing notice"
```
