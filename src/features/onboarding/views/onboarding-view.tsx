import { useState } from "react";
import { IntroStep } from "../components/step-screens";

export function OnboardingView() {
  const [step, setStep] = useState(0);

  return (
    <div>
      OnboardingView
      {step === 0 && <IntroStep />}
    </div>
  );
}
