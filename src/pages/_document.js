import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <title>AI Portfolio</title>
        {/* Favicons — theme-aware using media queries for system preferences.
            Manual theme toggles are handled via client-side state, but this provides
            the correct defaults for the browser. */}
        <link rel="icon" href="/logo_rounded_dark.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/logo_rounded_light.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/logo_rounded_dark.png" sizes="32x32" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo_rounded_dark.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Overpass:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
