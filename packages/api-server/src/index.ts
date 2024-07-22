/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import { createOpenApiExpressMiddleware } from 'trpc-openapi';
import swaggerUi from 'swagger-ui-express';
import { openApiDocument } from './openapi'
import { appRouter, createContext } from "./routes/App.routes";



const app = express();
const port = 8080;

app.use(cors());

app.use('/api/trpc', createExpressMiddleware({ router: appRouter, createContext }))
app.use('/api', createOpenApiExpressMiddleware({ router: appRouter, createContext }))

app.use('/', swaggerUi.serve)
app.get('/', swaggerUi.setup(openApiDocument))

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});

