import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

// Export base utilities
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const createMiddleware = t.middleware;
export const publicProcedure = t.procedure;
