import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { trpc } from "./trpc";
import React, { useState } from "react";
import "./index.scss";

const client = new QueryClient();

const AppContent = () => {
  const trpcQuery = trpc.useQuery(["hello"]);
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>Name: client</div>
      <div>{JSON.stringify(trpcQuery.data)}</div>
      <div>Framework: react</div>
      <div>Language: TypeScript</div>
      <div>CSS: Tailwind</div>
    </div>
  );
};
const App = () => {
  const [trpcClient] = useState(() =>
    trpc.createTRPCClient({
      links: [httpBatchLink({ url: "http://localhost:3030/trpc" })],
    }),
  );

  return (
    <QueryClientProvider client={trpcClient} queryClient={client}>
      <AppContent />
    </QueryClientProvider>
  );
};
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
