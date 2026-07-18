#!/usr/bin/env tsx
import { spawnSync } from "node:child_process";

const environment = process.argv[2];

if (environment !== "preview" && environment !== "production") {
	console.error("Usage: tsx bin/build.ts <preview|production>");
	process.exit(1);
}

const childEnvironment = { ...process.env, CLOUDFLARE_ENV: environment };
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

function run(command: string, args: string[]) {
	const result = spawnSync(command, args, {
		env: childEnvironment,
		shell: process.platform === "win32",
		stdio: "inherit",
	});

	if (result.error) {
		throw result.error;
	}
	if (result.status !== 0) {
		process.exit(result.status ?? 1);
	}
}

run(npxCommand, ["tsc", "-b"]);
run(npxCommand, ["vite", "build", "--mode", environment]);
