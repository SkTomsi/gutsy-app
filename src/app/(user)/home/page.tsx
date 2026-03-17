import { caller } from "@/trpc/server";

export default async function Home() {
  const user = await caller.user.getUser();

  return (
    <div>
      Consumer Home Page
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
