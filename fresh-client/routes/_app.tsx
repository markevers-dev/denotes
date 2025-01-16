import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>DeNotes</title>
        <link rel="stylesheet" href="/styles.css" />
        <link
          href="https://fonts.googleapis.com/css2?family=DynaPuff:wght@400;700&display=swap&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body class="z-[1] flex h-full min-h-screen max-h-screen w-full flex-col antialiased bg-brand-primary text-brand-offWhite font-dynapuff">
        <Component />
      </body>
    </html>
  );
}
