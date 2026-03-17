import { OnboardingPrompt } from "@/features/onboarding/components/onboarding-prompt";

export default function ConsumerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <OnboardingPrompt />
      Consumer Layout
      {children}
    </div>
  );
}
