import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

export const setupDatabase = async (client: Client) => {
  await client.connect();

  await client.queryObject(`
    CREATE TABLE IF NOT EXISTS folder (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      parent_folder_id INTEGER REFERENCES folder(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.queryObject(`
    CREATE TABLE IF NOT EXISTS note (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      folder_id INTEGER REFERENCES folder(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const columnExists = await client.queryObject(`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'note' AND column_name = 'content_search'
  `);

  if (columnExists.rows.length === 0) {
    await client.queryObject(
      `ALTER TABLE note ADD COLUMN content_search tsvector;`,
    );

    await client.queryObject(
      `CREATE INDEX note_content_search_idx ON note USING gin(content_search);`,
    );

    await client.queryObject(
      `CREATE TRIGGER update_note_search BEFORE INSERT OR UPDATE ON note
        FOR EACH ROW EXECUTE FUNCTION tsvector_update_trigger(content_search, 'pg_catalog.english', content);`,
    );
  }

  await client.queryObject(`
    CREATE TABLE IF NOT EXISTS starred_note (
      note_id INTEGER REFERENCES note(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (note_id)
    );
`);
};
