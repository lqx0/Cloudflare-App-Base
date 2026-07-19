-- Align the existing accounts table with Better Auth's OAuth account schema.
-- The fields are nullable because password credentials do not provide OAuth tokens.
ALTER TABLE accounts ADD COLUMN idToken TEXT;
ALTER TABLE accounts ADD COLUMN refreshTokenExpiresAt INTEGER;
