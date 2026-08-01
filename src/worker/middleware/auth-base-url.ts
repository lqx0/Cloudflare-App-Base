export type AuthEnvironment = "local" | "preview" | "production" | "test";

export function getAuthBaseURL(requestUrl: string, environment: AuthEnvironment, configuredBaseURL?: string): string {
	if (configuredBaseURL) return configuredBaseURL;
	if (environment === "local" || environment === "test") return new URL(requestUrl).origin;
	if (environment === "preview") return "https://preview.example.com";
	return "https://app.example.com";
}
