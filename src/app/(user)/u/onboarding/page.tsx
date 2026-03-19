import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OnboardingView } from "@/features/onboarding/views/onboarding-view";
import { auth } from "@/lib/auth";
import logger from "@/lib/logger";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    logger.info("User not logged in, redirecting to login");
    redirect("/login");
  }

  if (session.user.isOnboarded) {
    logger.info("User already onboarded, redirecting to home");
    redirect("/u/home");
  }

  return <OnboardingView />;
}
