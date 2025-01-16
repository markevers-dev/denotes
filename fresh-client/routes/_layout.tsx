import { Header, SideBar } from "../components/index.ts";
import { PageProps } from "$fresh/server.ts";
import { defineLayout } from "$fresh/server.ts";
import { getAllNotes } from "../utils/data.ts";

export default defineLayout(async (req, ctx) => {
  const data = await getAllNotes();
  const note = data[0].notes[0];

  return (
    <>
      <Header />
      <main class="flex flex-row w-full h-full flex-grow">
        <SideBar folders={data} />
        <ctx.Component note={note} />
      </main>
    </>
  );
});
