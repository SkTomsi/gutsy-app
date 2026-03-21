import healthRouter from "@/trpc/routers/health";
import userRouter from "@/trpc/routers/user";
import { createTRPCRouter } from "../core";

export const appRouter = createTRPCRouter({
  health: healthRouter,
  user: userRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
