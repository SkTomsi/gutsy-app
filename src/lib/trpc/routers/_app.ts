import db from "@/lib/prisma";
import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  getHealth: baseProcedure.query(async () => {
    return { status: "ok", code: 200 };
  }),

  getDbHealth: baseProcedure.query(async () => {
    const health = await db.dbHealth.findMany();

    if (health.length === 0) {
      return { status: "error", code: 500 };
    }

    return { status: "ok", code: 200 };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
