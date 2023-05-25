import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { api, trpc } from "./utils/trpc";
import App from "./App";

import "./index.css";

function ClientProviders() {
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() => api);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClientProviders />
  </React.StrictMode>
);
