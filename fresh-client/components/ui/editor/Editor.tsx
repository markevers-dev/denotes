import { Note } from "../../../types/index.ts";

interface EditorProps {
    note: Note;
  }  

export const Editor = ({ note }: EditorProps) => {
    const { note_title: title } = note;

    return (
        <form class="mx-auto w-full bg-brand-secondary">
            <div class="w-full p-2 bg-brand-darkGray">
                <p class="text-md font-bold">{title}</p>
            </div>
          <input class="h-full w-full bg-brand-darkGray font-inter p-2" type="text" value={note.note_content ? note.note_content : ""} />
        </form>
      );
}