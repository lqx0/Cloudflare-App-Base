import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { config } from "../src/config";

const root = path.resolve(import.meta.dirname, "..");

test("uses the project display name while preserving the reusable base package", async () => {
  const packageJson = JSON.parse(
    await readFile(path.join(root, "package.json"), "utf8"),
  ) as { name: string };

  assert.equal(config.appName, "aDaptQuiz");
  assert.equal(packageJson.name, "cloudflare-app-base");
});

test("documents the base vision and project branch policy in both languages", async () => {
  const [english, chinese] = await Promise.all([
    readFile(path.join(root, "VISION.md"), "utf8"),
    readFile(path.join(root, "VISION.zh-CN.md"), "utf8"),
  ]);

  for (const content of [english, chinese]) {
    assert.match(content, /Cloudflare-App-Base/);
    assert.match(content, /project\//);
    assert.match(content, /archive\//);
  }
});
