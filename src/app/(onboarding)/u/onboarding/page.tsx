import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OnboardingView } from "@/features/onboarding/views/onboarding-view";
import { auth } from "@/lib/auth";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (session.user.isOnboarded) {
    redirect("/home");
  }

  return <OnboardingView />;
}
