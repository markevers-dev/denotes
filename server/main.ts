import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { server_port } from "./config/settings.ts";

const client = new Client({
  user: Deno.env.get("POSTGRES_USERNAME"),
  password: Deno.env.get("POSTGRES_PASSWORD"),
  database: "denotes",
  hostname: "localhost",
  port: 5432,
});

await client.connect();

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "Hello Mesozoic World! Rawr!";
  })
  .get("/notes", async (ctx) => {
    const result = await client.queryObject("SELECT * FROM notes");
    ctx.response.body = result.rows;
    client.end();
  })
  .post("/notes", async (ctx) => {
    const { title, content } = await ctx.request.body.json();
    await client.queryObject(`INSERT INTO notes (title, content) VALUES (${title}, ${content})`);
    ctx.response.body = { success: true };
    client.end();
  })
  .get("/notes/:id", async (ctx) => {
    const id = ctx.params.id;
    const result = await client.queryObject(`SELECT * FROM notes WHERE id = ${id}`);
    ctx.response.body = result.rows[0] as Record<string, unknown>;
    client.end();
  })
  .put("/notes/:id", async (ctx) => {
    const id = ctx.params.id;
    const { title, content } = await ctx.request.body.json();
    await client.queryObject(`UPDATE notes SET title = ${title}, content = ${content} WHERE id = ${id}`);
    ctx.response.body = { success: true };
    client.end();
  })
  .delete("/notes/:id", async (ctx) => {
    const id = ctx.params.id;
    await client.queryObject(`DELETE FROM notes WHERE id = ${id}`);
    ctx.response.body = { success: true };
    client.end();
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server is running on http://localhost:${server_port}`);
await app.listen({ port: server_port });
