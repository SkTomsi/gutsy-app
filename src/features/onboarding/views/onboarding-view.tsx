"use client";

import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { sileo } from "sileo";
import { defaultPatterns } from "web-haptics";

import AccentButton from "@/components/custom/accent-button";
import { ScreenWrapper } from "@/components/custom/screen-wrapper";
import { Caption } from "@/components/typography/font";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { useHaptics } from "@/lib/haptics";
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

/* -------------------------------------------------------------------------- */
/*                                  Types                                     */
/* -------------------------------------------------------------------------- */

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
};

type NotificationStatus = "idle" | "granted" | "denied";

/* -------------------------------------------------------------------------- */
/*                            Step Configuration                              */
/* -------------------------------------------------------------------------- */

const TOTAL_STEPS = 8;
const LAST_CONTENT_STEP = 6;

const NAV_STEPS = new Set([1, 2, 3, 4, 5, 6]);

/* -------------------------------------------------------------------------- */
/*                              Component                                     */
/* -------------------------------------------------------------------------- */

export function OnboardingView() {
  const router = useRouter();
  const haptics = useHaptics();
  const { refetch } = useSession();
  const trpc = useTRPC();

  const [step, setStep] = useState(0);
  const [notificationStatus, setNotificationStatus] =
    useState<NotificationStatus>("idle");

  const [data, setData] = useState<OnboardingData>({
    conditions: [],
    goals: [],
    loggingFrequency: "",
    checkInTimes: {
      morning: "08:00",
      afternoon: "13:00",
      evening: "20:00",
    },
  });

  /* ------------------------------------------------------------------------ */
  /*                                Mutation                                  */
  /* ------------------------------------------------------------------------ */

  const completeOnboarding = useMutation(
    trpc.user.completeOnboarding.mutationOptions({
      onSuccess: async () => {
        await refetch();
        haptics.trigger(defaultPatterns.success);
        sileo.success({ title: "Onboarding complete 🎉" });
      },
    }),
  );

  /* ------------------------------------------------------------------------ */
  /*                              Derived State                               */
  /* ------------------------------------------------------------------------ */

  const canContinue = useMemo(() => {
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
  }, [step, data]);

  const ctaLabel = useMemo(() => {
    if (completeOnboarding.isPending) return "Setting things up...";
    if (step === TOTAL_STEPS - 1) return "Log my first meal →";
    if (step === LAST_CONTENT_STEP) return "I'm ready →";
    return "Continue";
  }, [step, completeOnboarding.isPending]);

  /* ------------------------------------------------------------------------ */
  /*                              Actions                                     */
  /* ------------------------------------------------------------------------ */

  const goNext = useCallback(() => {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }, []);

  const goBack = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const submitOnboarding = useCallback(() => {
    completeOnboarding.mutate({
      conditions: data.conditions,
      goals: data.goals,
      loggingFrequency: data.loggingFrequency,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      checkInTimes: data.checkInTimes,
      notificationsEnabled: notificationStatus === "granted",
    });
  }, [data, notificationStatus, completeOnboarding]);

  const handleContinue = useCallback(() => {
    // Final screen → dashboard
    if (step === TOTAL_STEPS - 1) {
      router.push("/u/home");
      return;
    }

    // Submit on notification step
    if (step === LAST_CONTENT_STEP) {
      submitOnboarding();
    }

    goNext();
  }, [step, router, submitOnboarding, goNext]);

  const requestNotifications = useCallback(async () => {
    if (!("Notification" in window)) {
      setNotificationStatus("denied");
      return;
    }

    const permission = await Notification.requestPermission();
    setNotificationStatus(permission === "granted" ? "granted" : "denied");
  }, []);

  /* ------------------------------------------------------------------------ */
  /*                              Render Step                                 */
  /* ------------------------------------------------------------------------ */

  const StepContent = useMemo(() => {
    switch (step) {
      case 0:
        return <Introduction />;

      case 1:
        return <AppDisclaimer />;

      case 2:
        return (
          <CollectUserSymptoms
            selected={data.conditions}
            onChange={(conditions) => setData((d) => ({ ...d, conditions }))}
          />
        );

      case 3:
        return (
          <CollectUserGoals
            selected={data.goals}
            onChange={(goals) => setData((d) => ({ ...d, goals }))}
          />
        );

      case 4:
        return (
          <LoggingFrequency
            selected={data.loggingFrequency}
            onChange={(loggingFrequency) =>
              setData((d) => ({ ...d, loggingFrequency }))
            }
          />
        );

      case 5:
        return (
          <ReminderSetup
            times={data.checkInTimes}
            onChange={(checkInTimes) =>
              setData((d) => ({ ...d, checkInTimes }))
            }
          />
        );

      case 6:
        return (
          <NotificationPermission
            status={notificationStatus}
            onRequest={requestNotifications}
          />
        );

      case 7:
        return <AllDone />;

      default:
        return null;
    }
  }, [step, data, notificationStatus, requestNotifications]);

  /* ------------------------------------------------------------------------ */
  /*                                 Render                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <ScreenWrapper className="justify-center min-h-dvh relative">
      {/* Top Bar */}
      {NAV_STEPS.has(step) && (
        <div className="fixed top-0 w-full max-w-md mx-auto p-4 bg-background z-10">
          <Caption className="text-center">ONBOARDING</Caption>

          <div className="flex items-center gap-4 h-12">
            <Button
              variant="ghost"
              size="icon-lg"
              onClick={goBack}
              disabled={completeOnboarding.isPending}
            >
              <ArrowLeft className="size-4" />
            </Button>

            <StepIndicator step={step - 1} total={TOTAL_STEPS - 2} />
          </div>
        </div>
      )}

      {/* Content */}
      <div
        className={`flex flex-col items-center w-full px-4 pb-28
        ${NAV_STEPS.has(step) ? "pt-24" : "pt-8"}`}
      >
        {StepContent}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 w-full max-w-md mx-auto py-6 bg-background">
        <div className="px-4 flex flex-col gap-3">
          <AccentButton
            className="w-full h-14"
            onClick={handleContinue}
            disabled={!canContinue || completeOnboarding.isPending}
          >
            {ctaLabel}
          </AccentButton>

          {step === 6 && notificationStatus === "idle" && (
            <button
              type="button"
              onClick={handleContinue}
              className="text-sm text-muted-foreground underline"
            >
              Maybe later — I understand I might miss things
            </button>
          )}
        </div>
      </div>
    </ScreenWrapper>
  );
}
