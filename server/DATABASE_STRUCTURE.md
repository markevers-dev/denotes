# Database Structure

This file briefly shows the structure of the tables in the 'denotes' database,
as it should be set-up. Running the Oak server should create these tables.

## Tables

**Folder:**

- id: SERIAL PRIMARY KEY
- name: TEXT NOT NULL
- parent_folder_id: INTEGER REFERENCES folder(id) ON DELETE CASCADE
- create_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

**Note:**

- id: SERIAL PRIMARY KEY
- title: TEXT NOT NULL
- content: TEXT NOT NULL
- folder_id: INTEGER REFERENCES folder(id) ON DELETE CASCADE
- create_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
