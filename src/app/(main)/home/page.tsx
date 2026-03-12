"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/lib/trpc/client";

export default function Home() {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.getHealth.queryOptions());

  return (
    <div>
      <div>Home Page</div>;<div>Trpc Status: {data?.status}</div>
    </div>
  );
}
