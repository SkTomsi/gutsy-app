import db from "@/lib/prisma";
import { createTRPCRouter, publicProcedure } from "../init";

export default createTRPCRouter({
  getHealth: publicProcedure.query(async () => {
    return { status: "ok", code: 200 };
  }),

  getDbHealth: publicProcedure.query(async () => {
    const health = await db.dbHealth.findMany();

    if (health.length === 0) {
      return { status: "error", code: 500 };
    }

    return { status: "ok", code: 200 };
  }),
});
