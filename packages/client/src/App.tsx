import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { trpc } from "./trpc";
import React, { useState } from "react";
import "./index.scss";
import { IndexPage} from './IndexPage.tsx'

export const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8080/trpc',
        }),
      ],
    }),
  );
    return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
<QueryClientProvider client={queryClient}>
      <IndexPage/>
    </QueryClientProvider>
    </trpc.Provider>)}
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
