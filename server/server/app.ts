import { Application } from "jsr:@oak/oak/application";
import { createFolderRoutes } from "../routes/folder.ts";
import { createNoteRoutes } from "../routes/note.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

export const createApp = (client: Client): Application => {
  const app = new Application();

  app.use(createFolderRoutes(client).routes());
  app.use(createFolderRoutes(client).allowedMethods());
  app.use(createNoteRoutes(client).routes());
  app.use(createNoteRoutes(client).allowedMethods());

  return app;
};
