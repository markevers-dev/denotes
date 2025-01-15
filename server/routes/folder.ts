import { Router } from "jsr:@oak/oak/router";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

export const createFolderRoutes = (client: Client): Router => {
  const router = new Router();

  router
    .get("/folders", async (ctx) => {
      const result = await client.queryObject("SELECT * FROM folder");
      ctx.response.body = result.rows;
    })
    .post("/folders", async (ctx) => {
      const { name, parent_folder_id } = await ctx.request.body.json();
      await client.queryObject(
        `INSERT INTO folder (name, parent_folder_id) VALUES ($1, $2)`,
        [name, parent_folder_id || null],
      );
      ctx.response.body = { success: true };
    })
    .get("/folders/:id", async (ctx) => {
      const id = ctx.params.id;
      const result = await client.queryObject(
        `SELECT * FROM folder WHERE id = $1`,
        [id],
      );
      ctx.response.body = result.rows[0] || { error: "Folder not found" };
    })
    .put("/folders/:id", async (ctx) => {
      const id = ctx.params.id;
      const { name, parent_folder_id } = await ctx.request.body.json();
      await client.queryObject(
        `UPDATE folder SET name = $1, parent_folder_id = $2 WHERE id = $3`,
        [name, parent_folder_id || null, id],
      );
      ctx.response.body = { success: true };
    })
    .delete("/folders/:id", async (ctx) => {
      const id = ctx.params.id;
      await client.queryObject(`DELETE FROM folder WHERE id = $1`, [id]);
      ctx.response.body = { success: true };
    });

  return router;
};
