import { Hono } from "hono";
import { createRequestHandler } from "react-router";
import { createDb, type Database } from "../app/db";
import { DatabaseService } from "../app/db/service";
import { users } from "../app/db/schema";

interface Env {
	DB: D1Database;
}

interface Variables {
	db: Database;
	dbService: DatabaseService;
}

const app = new Hono<{ Bindings: Env; Variables: Variables }>();

// Middleware to add database to context
app.use("*", async (c, next) => {
	const db = createDb(c.env);
	c.set("db", db);
	c.set("dbService", new DatabaseService(db));
	await next();
});

// Add more routes here
app.get("/api/users", async (c) => {
	const db = c.get("db");
	const allUsers = await db.select().from(users);
	return c.json(allUsers);
});

app.get("*", (c) => {
	const requestHandler = createRequestHandler(
		() => import("virtual:react-router/server-build"),
		import.meta.env.MODE,
	);

	return requestHandler(c.req.raw, {
		cloudflare: { env: c.env, ctx: c.executionCtx },
	});
});

export default app;
