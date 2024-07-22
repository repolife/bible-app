import { OpenApiMeta } from 'trpc-openapi';
import { initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { z } from 'zod';

export const createContext = ({
    req,
    res,
}: CreateExpressContextOptions) => ({});
type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC
    .context<Context>()
    .meta<OpenApiMeta>()
    .create({
        errorFormatter: ({ error, shape }) => {
            if (error.code === 'INTERNAL_SERVER_ERROR' && process.env.NODE_ENV === 'production') {
                return { ...shape, message: 'Internal server error' };
            }
            return shape;
        },
    });

const helloRouter = t.router({
    hello: t.procedure
        .meta({ openapi: { method: 'GET', path: '/hello', tags: ['hello'], summary: "Hello world!" } })
        .input(z.object({ name: z.string().optional() }))
        .output(z.string())
        .query(() => {
            return "hello from api-server"
        })
})
export const appRouter = t.router({
    hello: helloRouter
});

export type AppRouter = typeof appRouter;
