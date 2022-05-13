import type { AppProps } from "next/app";

import "@elastic/eui/dist/eui_theme_dark.css";

import { EuiProvider } from "@elastic/eui";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EuiProvider colorMode="dark">
      <Component {...pageProps} />
    </EuiProvider>
  );
}

export default MyApp;
