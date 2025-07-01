import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

interface Env {
	DB: D1Database;
}

export function createDb(env: Env) {
	return drizzle(env.DB, { schema });
}

export type Database = ReturnType<typeof createDb>;
