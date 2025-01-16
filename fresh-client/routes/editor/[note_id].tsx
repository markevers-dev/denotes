import { Note } from "../../types/index.ts";
import { Editor } from "../../components/index.ts";
import { getNoteById } from "../../utils/data.ts";
import { FreshContext } from "$fresh/server.ts";

export const EditorPage = async (_req: Request, ctx: FreshContext) => {
    const note: Note | null = await getNoteById(ctx.params.note_id);

    if (!note) {
        console.log("not returning")
        return <div class="text-center">Note not found</div>;
    }

    return (
        <Editor note={note} />
    );
}