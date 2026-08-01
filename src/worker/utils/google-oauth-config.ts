import { config } from "../../config";

export function isGoogleOAuthEnabled(env: { GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string }): boolean {
	return Boolean(config.auth.enableGoogleAuth && env.GOOGLE_CLIENT_ID?.trim() && env.GOOGLE_CLIENT_SECRET?.trim());
}
