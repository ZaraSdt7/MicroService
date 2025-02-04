import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";
import "jsr:@std/dotenv/load";
// Connect to the MySQL server
const client = new Client().connect({
  hostname: Deno.env.get("DB_HOST") || "localhost",
  username: Deno.env.get("DB_USER") || " root",
  password: Deno.env.get("DB_PASS") || "",
  db: Deno.env.get("DB_NAME") || "accounts_db",
});

export default client;
