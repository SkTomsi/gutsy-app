import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "@/lib/auth";
import db from "@/lib/prisma";

export const createTRPCContext = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    db,
    user: {
      id: session?.user.id,
    },
  };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
