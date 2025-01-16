import { Note } from "../note/type.ts";

export type Folder = {
  folder_id: string;
  folder_name: string;
  notes: Note[];
};
