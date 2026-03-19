import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import logger from "@/lib/logger";
import { caller } from "@/trpc/server";

export default async function Home() {
  const user = await caller.user.getUser();
  const session = auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    logger.warn("No session found, redirecting to login");
    redirect("/login");
  }

  return (
    <div>
      Consumer Home Page
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
