type GoogleOAuthCredentials = {
	GOOGLE_CLIENT_ID?: string;
	GOOGLE_CLIENT_SECRET?: string;
};

export function hasGoogleOAuthCredentials(env: GoogleOAuthCredentials): boolean {
	return Boolean(env.GOOGLE_CLIENT_ID?.trim() && env.GOOGLE_CLIENT_SECRET?.trim());
}
