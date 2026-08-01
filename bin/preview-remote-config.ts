#!/usr/bin/env tsx
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const PREVIEW_WORKER_NAME = "adaptquiz";
const PREVIEW_D1_NAME = "adaptquiz";
const PREVIEW_APP_BASE_URL = "https://quiz.fitoa.net";
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function readTomlString(section: string, key: string, content: string): string | undefined {
	const escapedSection = section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const sectionMatch = content.match(new RegExp(`(?:^|\\n)${escapedSection}\\s*\\r?\\n([\\s\\S]*?)(?=\\r?\\n\\[|$)`));
	return sectionMatch?.[1]?.match(new RegExp(`(?:^|\\n)\\s*${escapedKey}\\s*=\\s*"([^"]+)"`))?.[1];
}

export function validatePreviewRemoteConfig(content: string): void {
	const workerName = readTomlString("[env.preview]", "name", content);
	const emailProvider = readTomlString("[env.preview.vars]", "EMAIL_PROVIDER", content);
	const appBaseUrl = readTomlString("[env.preview.vars]", "APP_BASE_URL", content);
	const databaseName = readTomlString("[[env.preview.d1_databases]]", "database_name", content);
	const databaseId = readTomlString("[[env.preview.d1_databases]]", "database_id", content);
	const previewSection = content.match(/(?:^|\n)\[env\.preview\]\s*\r?\n([\s\S]*?)(?=\r?\n\[|$)/)?.[1] ?? "";
	const hasCustomDomainRoute = /\{\s*pattern\s*=\s*"quiz\.fitoa\.net"\s*,\s*custom_domain\s*=\s*true\s*\}/.test(previewSection);
	const failures: string[] = [];

	if (workerName !== PREVIEW_WORKER_NAME) failures.push(`Worker name must be ${PREVIEW_WORKER_NAME}.`);
	if (databaseName !== PREVIEW_D1_NAME) failures.push(`D1 database_name must be ${PREVIEW_D1_NAME}.`);
	if (!databaseId || !UUID_PATTERN.test(databaseId)) failures.push("D1 database_id must be the real UUID returned when the remote test D1 is created.");
	if (appBaseUrl !== PREVIEW_APP_BASE_URL) failures.push(`APP_BASE_URL must be ${PREVIEW_APP_BASE_URL}.`);
	if (!hasCustomDomainRoute) failures.push("Preview must declare the quiz.fitoa.net custom-domain route.");
	if (emailProvider !== "resend") failures.push("EMAIL_PROVIDER must be resend for the aDaptQuiz remote test environment.");

	if (failures.length > 0) {
		throw new Error(`Preview remote configuration is not ready:\n- ${failures.join("\n- ")}\nNo remote action was started.`);
	}
}

export function assertPreviewRemoteConfigReady(): void {
	const configPath = resolve(process.cwd(), "wrangler.toml");
	validatePreviewRemoteConfig(readFileSync(configPath, "utf8"));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
	try {
		assertPreviewRemoteConfigReady();
		console.log("Preview remote configuration is ready.");
	} catch (error) {
		console.error(error instanceof Error ? error.message : error);
		process.exit(1);
	}
}
