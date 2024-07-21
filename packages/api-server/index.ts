import express from "express";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";

const t = initTRPC.create();

const appRouter = t.router({
  hello: t.procedure.query(() => {
    return  "hello from api-server" ;
  }),
});

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());

const port = 8080;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.get("/", (req, res) => {
  res.send("hello from api-server");
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
