import { useSignal } from "@preact/signals";
import { Editor } from "../components/index.ts";
import { Note } from "../types/index.ts";
import Counter from "../islands/Counter.tsx";

interface HomeProps{
  note: Note;
}

export default function Home({ note }: HomeProps) {
  const count = useSignal(3);
  console.log(note)
  return (
    <Editor note={note} />
  );
}
