import { TRPCError } from "@trpc/server";
import { createMiddleware } from "./core";

export const requireAuth = createMiddleware(async ({ ctx, next }) => {
  if (!ctx.user.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to access this resource",
    });
  }

  return next({
    ctx: {
      user: {
        id: ctx?.user.id,
      },
    },
  });
});
