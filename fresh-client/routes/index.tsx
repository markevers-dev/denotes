import { useSignal } from "@preact/signals";

export default function Home() {
  const count = useSignal(3);
  return (
    <div>Homepage</div>
  );
}
