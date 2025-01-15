import { Router } from "jsr:@oak/oak/router";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

export const createNoteRoutes = (client: Client): Router => {
  const router = new Router();

  router
    .get("/notes", async (ctx) => {
      const result = await client.queryObject("SELECT * FROM note");
      ctx.response.body = result.rows;
    })
    .post("/notes", async (ctx) => {
      const { title, content, folder_id } = await ctx.request.body.json();
      await client.queryObject(
        `INSERT INTO note (title, content, folder_id) VALUES ($1, $2, $3)`,
        [title, content, folder_id || null],
      );
      ctx.response.body = { success: true };
    })
    .get("/notes/:id", async (ctx) => {
      const id = ctx.params.id;
      const result = await client.queryObject(
        `SELECT * FROM note WHERE id = $1`,
        [id],
      );
      ctx.response.body = result.rows[0] || { error: "Note not found" };
    })
    .put("/notes/:id", async (ctx) => {
      const id = ctx.params.id;
      const { title, content, folder_id } = await ctx.request.body.json();
      await client.queryObject(
        `UPDATE note SET title = $1, content = $2, folder_id = $3 WHERE id = $4`,
        [title, content, folder_id || null, id],
      );
      ctx.response.body = { success: true };
    })
    .delete("/notes/:id", async (ctx) => {
      const id = ctx.params.id;
      await client.queryObject(`DELETE FROM note WHERE id = $1`, [id]);
      ctx.response.body = { success: true };
    })
    .post("/notes/:id/star", async (ctx) => {
      const noteId = ctx.params.id;

      const existingStar = await client.queryObject(
        `SELECT 1 FROM starred_note WHERE note_id = $1`,
        [noteId],
      );

      if (existingStar.rows.length > 0) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Note already starred" };
        return;
      }

      await client.queryObject(
        `INSERT INTO starred_note (note_id) VALUES ($1)`,
        [noteId],
      );

      ctx.response.body = { success: true };
    })
    .delete("/notes/:id/star", async (ctx) => {
      const noteId = ctx.params.id;

      await client.queryObject(
        `DELETE FROM starred_note WHERE note_id = $1`,
        [noteId],
      );

      ctx.response.body = { success: true };
    })
    .get("/notes/search", async (ctx) => {
        const query = ctx.request.url.searchParams.get("query");
    
        if (!query) {
          ctx.response.status = 400;
          ctx.response.body = { error: "Search query is required" };
          return;
        }
    
        const result = await client.queryObject(
          "SELECT * FROM note WHERE content_search @@ plainto_tsquery($1)",
          [query]
        );
        ctx.response.body = result.rows;
      });

  return router;
};
