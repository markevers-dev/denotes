import { createApp } from "./server/app.ts";
import { setupDatabase } from "./database/setup.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { server_port } from "./config/settings.ts";
import {
  database_host,
  database_name,
  database_port,
} from "./config/database.ts";

const client = new Client({
  user: Deno.env.get("POSTGRES_USERNAME"),
  password: Deno.env.get("POSTGRES_PASSWORD"),
  database: database_name,
  hostname: database_host,
  port: database_port,
});

await setupDatabase(client);

const app = createApp(client);

console.log(`Oak Server is running on port ${server_port} and ready to Rawr!`);
await app.listen({ port: server_port });
