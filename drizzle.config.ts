import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./app/db/schema.ts",
	out: "./migrations",
	dialect: "sqlite",
	driver: "d1-http",
	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID as string,
		databaseId: "34110bf8-5de1-48f3-b41e-82d3c4587716",
		token: process.env.CLOUDFLARE_D1_TOKEN as string,
	},
});
