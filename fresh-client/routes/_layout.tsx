import { Header } from "../components/index.ts";
import { PageProps } from "$fresh/server.ts";

const Layout = ({ Component, state }: PageProps) => (
    <>
      <Header />
      <main class="flex flex-row w-full h-full flex-grow">
        <Component />
      </main>
    </>
  );

export default Layout;