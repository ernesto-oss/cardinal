import "../styles/globals.css";
import "@acme/ui/styles.css";

import { Inter } from "@next/font/google";

import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={inter.variable}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
