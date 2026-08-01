/**
 * Database schema types for Kysely matching Better Auth tables.
 */
export interface Database {
  quiz_questions: {
    id: string;
    type: "multiple_choice" | "true_false" | "free_text";
    prompt: string;
    optionsJson: string | null;
    correctAnswer: string;
    createdByUserId: string;
    createdAt: number;
  };
  users: {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    emailVerified: number;
    createdAt: number;
    updatedAt: number;
    /** Built-in roles: 'user' | 'admin'. Developers may add more. Default: 'user'. */
    role: string;
  };
  accounts: {
    accountId: string;
    id: string | null;
    userId: string;
    providerId: string;
    provider: string | null;
    providerAccountId: string | null;
    refreshToken: string | null;
    accessToken: string | null;
    idToken: string | null;
    accessTokenExpiresAt: number | null;
    refreshTokenExpiresAt: number | null;
    scope: string | null;
    password: string | null;
    createdAt: number;
    updatedAt: number;
  };
  sessions: {
    id: string;
    userId: string;
    token: string;
    expiresAt: number;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: number;
    updatedAt: number;
  };
  verifications: {
    id: string;
    identifier: string;
    token: string;
    expiresAt: number;
    createdAt: number;
    updatedAt: number;
  };
}
