import { Router } from "jsr:@oak/oak/router";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

/**
 * @description Creates and returns a router with routes for managing notes.
 *
 * @param {Client} client - The PostgreSQL client used for database operations.
 * @returns {Router} - The configured router with note routes.
 *
 * The following routes are defined:
 * - `GET /notes`: Retrieves all notes.
 * - `POST /notes`: Creates a new note with the provided title, content, and optional folder_id.
 * - `GET /notes/:id`: Retrieves a specific note by its ID.
 * - `PUT /notes/:id`: Updates a specific note by its ID with the provided title, content, and optional folder_id.
 * - `DELETE /notes/:id`: Deletes a specific note by its ID.
 * - `POST /notes/:id/star`: Stars a specific note by its ID.
 * - `DELETE /notes/:id/star`: Unstars a specific note by its ID.
 * - `GET /notes/search`: Searches for notes based on a query string.
 */
export const createNoteRoutes = (client: Client): Router => {
  const router = new Router();

  router
  .get("/notes", async (ctx) => {
    const result = await client.queryObject(
      `SELECT f.id AS folder_id, f.name AS folder_name, n.id AS note_id, n.title AS note_title
       FROM folder f
       LEFT JOIN note n ON f.id = n.folder_id`
    );
    const folders = result.rows.reduce((acc: any[], row: any) => {
      // Find the folder in the accumulated list
      let folder = acc.find((f) => f.folder_id === row.folder_id);
      if (!folder) {
        folder = {
          folder_id: row.folder_id,
          folder_name: row.folder_name,
          notes: [],
        };
        acc.push(folder);
      }
      // Add the note to the folder's notes
      if (row.note_id) {
        folder.notes.push({
          note_id: row.note_id,
          note_title: row.note_title,
        });
      }
      return acc;
    }, []);
    ctx.response.body = folders;
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
        [query],
      );
      ctx.response.body = result.rows;
    });

  return router;
};
