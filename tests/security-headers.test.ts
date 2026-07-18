import assert from "node:assert/strict";
import test from "node:test";
import { buildSecurityHeaders } from "../src/worker/middleware/security";

test("local CSP permits Vite websocket connections", () => {
  assert.match(buildSecurityHeaders("local")["Content-Security-Policy"], /ws:/);
});

test("production CSP is same-origin and blocks object embedding", () => {
  const headers = buildSecurityHeaders("production");
  assert.match(headers["Content-Security-Policy"], /default-src 'self'/);
  assert.match(headers["Content-Security-Policy"], /object-src 'none'/);
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
});
