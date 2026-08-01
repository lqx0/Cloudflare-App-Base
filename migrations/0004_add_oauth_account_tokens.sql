-- Better Auth social providers persist these token fields when creating or
-- refreshing an OAuth account. Email/password accounts leave them NULL.
ALTER TABLE accounts ADD COLUMN idToken TEXT;
ALTER TABLE accounts ADD COLUMN refreshTokenExpiresAt INTEGER;
