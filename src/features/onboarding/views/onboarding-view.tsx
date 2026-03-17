// OnboardingView.tsx
"use client";

import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { sileo } from "sileo";
import AccentButton from "@/components/custom/accent-button";
import { ScreenWrapper } from "@/components/custom/screen-wrapper";
import { Caption } from "@/components/typography/font";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { StepIndicator } from "../components/step-indicator";
import {
  AllDone,
  AppDisclaimer,
  CollectUserGoals,
  CollectUserSymptoms,
  Introduction,
  LoggingFrequency,
  NotificationPermission,
  ReminderSetup,
} from "../components/step-screens";

// Steps that show the back button and step indicator
// Steps 0 (intro) and 7 (all done) are excluded
const STEPS_WITH_NAV = [1, 2, 3, 4, 5, 6];
const TOTAL_STEPS = 8; // 0–7
const LAST_CONTENT_STEP = 6; // notification permission — last before done screen

type CheckInTimes = {
  morning: string;
  afternoon: string;
  evening: string;
};

type OnboardingData = {
  conditions: string[];
  goals: string[];
  loggingFrequency: string;
  checkInTimes: CheckInTimes;
  notificationsEnabled: boolean;
};

export function OnboardingView() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [notificationStatus, setNotificationStatus] = useState<
    "idle" | "granted" | "denied"
  >("idle");

  const [data, setData] = useState<OnboardingData>({
    conditions: [],
    goals: [],
    loggingFrequency: "",
    checkInTimes: {
      morning: "08:00",
      afternoon: "13:00",
      evening: "20:00",
    },
    notificationsEnabled: false,
  });

  const trpc = useTRPC();
  const completeOnboardingMutation = useMutation(
    trpc.user.completeOnboarding.mutationOptions({
      onSuccess: () => {
        sileo.success({
          title: "Onboarding complete 🎉",
        });
      },
    }),
  );

  // ── Validation per step ──────────────────────────────────────
  function canContinue(): boolean {
    switch (step) {
      case 2:
        return data.conditions.length > 0;
      case 3:
        return data.goals.length > 0;
      case 4:
        return data.loggingFrequency !== "";
      default:
        return true;
    }
  }

  // ── Notification request ─────────────────────────────────────
  async function requestNotifications() {
    if (!("Notification" in window)) {
      setNotificationStatus("denied");
      return;
    }
    const permission = await Notification.requestPermission();
    setNotificationStatus(permission === "granted" ? "granted" : "denied");
  }

  // ── Continue handler ─────────────────────────────────────────
  function handleContinue() {
    // From all-done screen — push to dashboard directly
    if (step === TOTAL_STEPS - 1) {
      router.push("/home");
      return;
    }

    // From notification step — submit then advance
    if (step === LAST_CONTENT_STEP) {
      completeOnboardingMutation.mutate({
        conditions: data.conditions,
        goals: data.goals,
        loggingFrequency: data.loggingFrequency,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        checkInTimes: data.checkInTimes,
        notificationsEnabled: notificationStatus === "granted",
      });

      setStep((s) => s + 1);
      return;
    }

    setStep((s) => s + 1);
  }

  // ── CTA label ────────────────────────────────────────────────
  function ctaLabel(): string {
    if (completeOnboardingMutation.isPending) return "Setting things up...";
    if (step === TOTAL_STEPS - 1) return "Log my first meal →";
    if (step === LAST_CONTENT_STEP) return "I'm ready →";
    return "Continue";
  }

  // ── Hide CTA on notification step if still idle ──────────────
  // User should tap "Allow notifications" button first,
  // then the Continue CTA appears to move forward

  return (
    <ScreenWrapper className="justify-center min-h-dvh relative">
      {/* ── Top bar — hidden on intro and all-done ── */}
      {STEPS_WITH_NAV.includes(step) && (
        <div className="flex-col flex w-full fixed top-0 left-0 right-0 p-4 bg-background max-w-md mx-auto z-10">
          <Caption className="text-center mx-auto w-full">ONBOARDING</Caption>
          <div className="w-full flex items-center gap-4 h-12">
            <Button
              variant="ghost"
              size="icon-lg"
              className="[&_svg]:h-6 [&_svg]:w-6"
              onClick={() => setStep((s) => s - 1)}
              disabled={completeOnboardingMutation.isPending}
            >
              <ArrowLeft className="size-4" />
            </Button>
            {/* Pass total - 2 to exclude intro (0) and all-done (7) from dot count */}
            <StepIndicator step={step - 1} total={TOTAL_STEPS - 2} />
          </div>
        </div>
      )}

      {/* ── Step content ── */}
      <div
        className={`flex flex-col items-center h-full w-full px-4 pb-28
        ${STEPS_WITH_NAV.includes(step) ? "pt-24" : "pt-8"}`}
      >
        {step === 0 && <Introduction />}
        {step === 1 && <AppDisclaimer />}
        {step === 2 && (
          <CollectUserSymptoms
            selected={data.conditions}
            onChange={(conditions) => setData((d) => ({ ...d, conditions }))}
          />
        )}
        {step === 3 && (
          <CollectUserGoals
            selected={data.goals}
            onChange={(goals) => setData((d) => ({ ...d, goals }))}
          />
        )}
        {step === 4 && (
          <LoggingFrequency
            selected={data.loggingFrequency}
            onChange={(loggingFrequency) =>
              setData((d) => ({ ...d, loggingFrequency }))
            }
          />
        )}
        {step === 5 && (
          <ReminderSetup
            times={data.checkInTimes}
            onChange={(checkInTimes) =>
              setData((d) => ({ ...d, checkInTimes }))
            }
          />
        )}
        {step === 6 && (
          <NotificationPermission
            status={notificationStatus}
            onRequest={requestNotifications}
          />
        )}
        {step === 7 && <AllDone />}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 py-6 before:inset-0 before:absolute before:w-full before:h-full before:bg-background mx-auto max-w-md w-full before:mask-t-from-70%">
        <div className="relative px-4 flex flex-col items-center gap-3">
          <AccentButton
            className="w-full h-14"
            onClick={handleContinue}
            disabled={!canContinue() || completeOnboardingMutation.isPending}
          >
            {ctaLabel()}
          </AccentButton>

          {/* Skip link — only on reminder and notification steps */}
          {step === 6 && notificationStatus === "idle" && (
            <button
              type="button"
              onClick={handleContinue}
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Maybe later — I understand I might miss things
            </button>
          )}
        </div>
      </div>
    </ScreenWrapper>
  );
}
