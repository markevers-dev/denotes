import { SideBar } from "../../components/index.ts";
import { defineLayout } from "$fresh/server.ts";
import { getAllNotes } from "../../utils/data.ts";

export default defineLayout(async (_req: Request, ctx) => {
  const data = await getAllNotes();

  return (
    <div class="w-full">
        <SideBar folders={data} />
        <ctx.Component />
      </div>
  );
});