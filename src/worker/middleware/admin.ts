import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import type { Next } from "hono";
import type { AppContext, AppUser } from "../types/context";
import type { Database } from "../types/database";

export async function authorizeAdministrator(user: Pick<AppUser, "id"> | null, loadRole: (id: string) => Promise<string | undefined>): Promise<boolean> {
	return Boolean(user?.id && await loadRole(user.id) === "admin");
}

export async function adminMiddleware(c: AppContext, next: Next) {
	const user = c.get("user");
	if (!user) return c.json({ error: "Unauthorized" }, 401);
	const db = new Kysely<Database>({ dialect: new D1Dialect({ database: c.env.DB }) });
	const allowed = await authorizeAdministrator(user, async (id) => (await db.selectFrom("users").select("role").where("id", "=", id).executeTakeFirst())?.role);
	if (!allowed) return c.json({ error: "Administrator access required" }, 403);
	await next();
}
