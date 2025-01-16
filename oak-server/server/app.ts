import { Application } from "jsr:@oak/oak/application";
import { createFolderRoutes } from "../routes/folder/route.ts";
import { createNoteRoutes } from "../routes/note/route.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

/**
 * @description Creates and configures an Oak Application instance with the provided PostgreSQL client.
 *
 * @param {Client} client - The PostgreSQL client used to interact with the database.
 * @returns {Application} An Oak Application instance with configured routes and allowed methods.
 */
export const createApp = (client: Client): Application => {
  const app = new Application();

  app.use(createFolderRoutes(client).routes());
  app.use(createFolderRoutes(client).allowedMethods());
  app.use(createNoteRoutes(client).routes());
  app.use(createNoteRoutes(client).allowedMethods());

  return app;
};
