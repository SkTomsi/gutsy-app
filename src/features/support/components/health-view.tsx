"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTRPC } from "@/lib/trpc/client";

export function HealthView() {
  const trpc = useTRPC();

  const { data: backendHealth, isLoading } = useQuery(
    trpc.getHealth.queryOptions(),
  );

  const { data: dbHealth, isLoading: isDbLoading } = useQuery(
    trpc.getDbHealth.queryOptions(),
  );

  return (
    <div className="flex flex-col gap-4 min-h-dvh px-3">
      <h1 className="text-2xl font-black tracking-tight pt-2">
        Gutsy App Health
      </h1>
      <div className="flex flex-col w-full gap-4">
        <Card className="flex-1">
          <CardHeader className=" w-full border-b">
            <div className="flex w-full items-center">
              <CardTitle className="font-bold text-lg ">Backend</CardTitle>
              {backendHealth?.code === 200 && (
                <div className="flex flex-1 items-center gap-2 text-end font-mono font-medium justify-end">
                  <div className="size-2 bg-emerald-500 animate-pulse rounded-2xl" />
                  Running
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="font-mono text-sm">
            {isLoading ? (
              <div className="animate-pulse text-muted-foreground">
                Checking backend...
              </div>
            ) : (
              <>
                <div>
                  Status:{" "}
                  {backendHealth?.status === "ok" ? "OK ✅" : "error ❌"}
                </div>
                <div>Code: {backendHealth?.code}</div>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className=" w-full border-b">
            <div className="flex w-full items-center">
              <CardTitle className="font-bold text-lg ">Database</CardTitle>
              {dbHealth?.code === 200 && (
                <div className="flex flex-1 items-center gap-2 text-end font-mono font-medium justify-end">
                  <div className="size-2 bg-emerald-500 animate-pulse rounded-2xl" />
                  Running
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="font-mono text-sm">
            {isDbLoading ? (
              <div className="animate-pulse text-muted-foreground">
                Checking Database...
              </div>
            ) : (
              <>
                <div>
                  Status: {dbHealth?.status === "ok" ? "OK ✅" : "error ❌"}
                </div>
                <div>Code: {dbHealth?.code}</div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
