"use client";

import { Bell, BellOff, CheckCircle2, CheckIcon } from "lucide-react";
import Image from "next/image";
import {
  Caption,
  HeadlineCaps,
  HeadlineS,
  TitleL,
  TitleS,
} from "@/components/typography/font";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { useSession } from "@/lib/auth-client";
import { CONDITIONS, GOALS } from "@/lib/user-attributes";

// ── Introduction ─────────────────────────────────────────────────

export function Introduction() {
  const { data: session, isPending } = useSession();
  const firstName = session?.user.name.split(" ")[0];

  return (
    <>
      <div className="flex flex-col">
        <Image
          src="/assets/mascot/3.png"
          alt="Intro"
          width={200}
          height={200}
        />
      </div>
      <div className="space-y-3 w-full px-4">
        <TitleL className="font-geist font-medium tracking-tighter text-center text-balance">
          {!isPending && firstName ? `Hi ${firstName}! ` : "Hi there! "}
          Meet <span className="text-primary">Gloop 👋🏻</span>
          {", "}your gut health companion.
        </TitleL>
      </div>
    </>
  );
}

// ── App Disclaimer ───────────────────────────────────────────────

export function AppDisclaimer() {
  return (
    <div className="flex flex-col justify-end h-full items-start w-full">
      <div className="space-y-4 flex flex-col">
        <HeadlineCaps className="text-secondary-foreground/50 text-sm">
          Before we start
        </HeadlineCaps>
        <TitleL className="font-geist font-medium tracking-tighter text-balance">
          Gloop is not a{" "}
          <span className="font-semibold font-mono">diet app 🚫</span>
        </TitleL>
        <HeadlineS className="text-muted-foreground/80">
          We don't count calories. We don't tell you what to eat. We just help
          you understand how food makes you feel — because everyone's gut is
          different.
        </HeadlineS>
        <div className="flex flex-col gap-3 pt-2">
          {[
            { emoji: "⚡", text: "Log a meal in 30 seconds" },
            { emoji: "🔍", text: "Spot patterns in as little as 14 days" },
            { emoji: "🎯", text: "Get answers, not restrictions" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <span className="text-xl">{item.emoji}</span>
              <HeadlineS className="text-muted-foreground/80">
                {item.text}
              </HeadlineS>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Collect Symptoms ─────────────────────────────────────────────

type CollectUserSymptomsProps = {
  selected: string[];
  onChange: (selected: string[]) => void;
};

export function CollectUserSymptoms({
  selected,
  onChange,
}: CollectUserSymptomsProps) {
  function toggleChip(value: string) {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  }

  return (
    <div className="flex flex-col justify-end h-full items-start w-full py-6 gap-6">
      <div className="space-y-4 flex flex-col">
        <HeadlineCaps className="text-secondary-foreground/50 text-sm">
          know your gut
        </HeadlineCaps>
        <TitleL className="font-geist font-medium tracking-tighter text-balance">
          What's your gut been putting you through? 🤔
        </TitleL>
        <HeadlineS className="text-muted-foreground/80">
          Pick everything that applies. This is just between you and Gloop.
        </HeadlineS>
      </div>
      <div className="flex gap-2 w-full flex-wrap">
        {CONDITIONS.map((c) => (
          <Toggle
            key={c.key}
            pressed={selected.includes(c.key)}
            onPressedChange={() => toggleChip(c.key)}
            variant="outline"
            className="rounded-full px-4 text-sm"
          >
            {c.emoji} {c.label}
          </Toggle>
        ))}
      </div>
      {selected.length === 0 && (
        <Caption className="text-muted-foreground/60 text-center w-full">
          Select at least one to continue
        </Caption>
      )}
    </div>
  );
}

// ── Collect Goals ────────────────────────────────────────────────

type CollectUserGoalsProps = {
  selected: string[];
  onChange: (selected: string[]) => void;
};

export function CollectUserGoals({
  selected,
  onChange,
}: CollectUserGoalsProps) {
  function toggleGoal(value: string) {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  }

  return (
    <div className="flex flex-col h-full items-start w-full py-6 gap-6">
      <div className="space-y-4 flex flex-col">
        <HeadlineCaps className="text-secondary-foreground/50 text-sm">
          your goals
        </HeadlineCaps>
        <TitleL className="font-geist font-medium tracking-tighter text-balance">
          What would change everything for you? 🎯
        </TitleL>
        <HeadlineS className="text-muted-foreground/80">
          This helps Gloop focus on what actually matters to you.
        </HeadlineS>
      </div>

      {selected.length === 0 && (
        <Caption className="text-muted-foreground/60 text-center w-full">
          Select at least one to continue
        </Caption>
      )}

      <div className="flex flex-col gap-3 w-full">
        {GOALS.map((g) => {
          const isSelected = selected.includes(g.key);
          return (
            <button
              key={g.key}
              type="button"
              onClick={() => toggleGoal(g.key)}
              className={`flex w-full items-center gap-4 border px-4 py-3 min-h-18 rounded-2xl text-left transition-colors
                ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-muted bg-transparent"
                }`}
            >
              <div className="text-4xl">{g.emoji}</div>
              <div className="flex flex-col space-y-0.5 flex-1">
                <TitleS className="text-base">{g.label}</TitleS>
                <Caption className="text-muted-foreground">
                  {g.description}
                </Caption>
              </div>

              {isSelected && <CheckCircle2 />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Logging Frequency ────────────────────────────────────────────

const FREQUENCY_OPTIONS = [
  {
    key: "EVERY_MEAL",
    label: "Every meal, every day",
    description: "I'm committed — I want the fastest results",
    emoji: "🔥",
  },
  {
    key: "ONCE_TWICE",
    label: "Once or twice a day",
    description: "I'll do my best when I remember",
    emoji: "👍",
  },
  {
    key: "FEW_TIMES_WEEK",
    label: "A few times a week",
    description: "Life gets busy — I'll log when I can",
    emoji: "😅",
  },
  {
    key: "WHENEVER",
    label: "Whenever I remember",
    description: "No pressure, just going to try it out",
    emoji: "🤷",
  },
] as const;

type LoggingFrequencyProps = {
  selected: string;
  onChange: (value: string) => void;
};

export function LoggingFrequency({
  selected,
  onChange,
}: LoggingFrequencyProps) {
  return (
    <div className="flex flex-col h-full items-start w-full py-6 gap-6">
      <div className="space-y-4 flex flex-col">
        <HeadlineCaps className="text-secondary-foreground/50 text-sm">
          be honest
        </HeadlineCaps>
        <TitleL className="font-geist font-medium tracking-tighter text-balance">
          How often do you think you can log? 🗓️
        </TitleL>
        <HeadlineS className="text-muted-foreground/80">
          Gloop works with whatever you give him — even if it's not perfect.
        </HeadlineS>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {FREQUENCY_OPTIONS.map((option) => {
          const isSelected = selected === option.key;
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => onChange(option.key)}
              className={`flex w-full items-center gap-4 border px-4 py-3 min-h-16 rounded-2xl text-left transition-all
                ${
                  isSelected
                    ? "border-primary bg-primary/5 scale-[1.01]"
                    : "border-muted bg-transparent"
                }`}
            >
              <div className="text-3xl">{option.emoji}</div>
              <div className="flex flex-col space-y-0.5 flex-1">
                <TitleS className="text-base">{option.label}</TitleS>
                <Caption className="text-muted-foreground">
                  {option.description}
                </Caption>
              </div>

              {isSelected && <CheckCircle2 />}
            </button>
          );
        })}
      </div>

      <Caption className="text-muted-foreground/50 text-center w-full">
        Most people find their first trigger food within 14 days of consistent
        logging.
      </Caption>
    </div>
  );
}

// ── Reminder Setup ───────────────────────────────────────────────

type CheckInTimes = {
  morning: string;
  afternoon: string;
  evening: string;
};

type ReminderSetupProps = {
  times: CheckInTimes;
  onChange: (times: CheckInTimes) => void;
};

export function ReminderSetup({ times, onChange }: ReminderSetupProps) {
  const slots = [
    {
      key: "morning",
      label: "Morning nudge",
      emoji: "🌅",
      hint: "After breakfast",
    },
    {
      key: "afternoon",
      label: "Afternoon nudge",
      emoji: "☀️",
      hint: "After lunch",
    },
    {
      key: "evening",
      label: "Evening nudge",
      emoji: "🌙",
      hint: "After dinner",
    },
  ] as const;

  return (
    <div className="flex flex-col h-full items-start w-full py-6 gap-6">
      <div className="space-y-4 flex flex-col">
        <HeadlineCaps className="text-secondary-foreground/50 text-sm">
          reminders
        </HeadlineCaps>
        <TitleL className="font-geist font-medium tracking-tighter text-balance">
          When should Gloop check in on you? ⏰
        </TitleL>
        <HeadlineS className="text-muted-foreground/80">
          Logging takes 30 seconds. Pick times that fit naturally into your day
          — after meals works best.
        </HeadlineS>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {slots.map((slot) => (
          <div
            key={slot.key}
            className="flex items-center justify-between border border-muted rounded-2xl px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{slot.emoji}</span>
              <div className="flex flex-col">
                <TitleS className="text-base">{slot.label}</TitleS>
                <Caption className="text-muted-foreground">{slot.hint}</Caption>
              </div>
            </div>
            <Input
              type="time"
              className="w-24"
              value={times[slot.key]}
              onChange={(e) =>
                onChange({ ...times, [slot.key]: e.target.value })
              }
            />
          </div>
        ))}
      </div>

      <Caption className="text-muted-foreground/50 text-center w-full">
        Gloop sends a gentle nudge — not a guilt trip. Change these anytime in
        settings.
      </Caption>
    </div>
  );
}

// ── Notification Permission ──────────────────────────────────────

type NotificationPermissionProps = {
  status: "idle" | "granted" | "denied";
  onRequest: () => void;
};

export function NotificationPermission({
  status,
  onRequest,
}: NotificationPermissionProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-6 gap-8 text-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className={`size-24 rounded-full flex items-center justify-center transition-colors
          ${
            status === "granted"
              ? "bg-primary/10"
              : status === "denied"
                ? "bg-muted"
                : "bg-primary/10"
          }`}
        >
          {status === "denied" ? (
            <BellOff className="size-10 text-muted-foreground" />
          ) : (
            <Bell
              className={`size-10 ${status === "granted" ? "text-primary" : "text-primary"}`}
            />
          )}
        </div>

        <div className="space-y-3">
          <HeadlineCaps className="text-secondary-foreground/50 text-sm">
            one last thing
          </HeadlineCaps>
          <TitleL className="font-geist font-medium tracking-tighter text-balance">
            {status === "granted"
              ? "Gloop is all set 🎉"
              : status === "denied"
                ? "No worries 👍"
                : "Can Gloop nudge you? 🔔"}
          </TitleL>
          <HeadlineS className="text-muted-foreground/80 text-balance">
            {status === "granted"
              ? "You'll get a gentle nudge when your streak is at risk and when new insights are ready."
              : status === "denied"
                ? "You won't get reminders but you can always turn them on later in settings."
                : "Gloop needs permission to remind you before your streak is at risk or when a new insight is ready."}
          </HeadlineS>
        </div>
      </div>

      {status === "idle" && (
        <button
          type="button"
          onClick={onRequest}
          className="flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary font-medium rounded-2xl px-6 py-3 transition-colors hover:bg-primary/10"
        >
          <Bell className="size-4" />
          Allow notifications
        </button>
      )}

      {status === "granted" && (
        <div className="flex items-center gap-2 text-primary text-sm font-medium">
          <CheckIcon className="size-4" />
          Notifications enabled
        </div>
      )}
    </div>
  );
}

// ── All Done ─────────────────────────────────────────────────────

export function AllDone() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-6 gap-8 text-center">
      <Image
        src="/assets/mascot/3.png"
        alt="Gloop celebrating"
        width={180}
        height={180}
        className="animate-bounce-slow"
      />

      <div className="space-y-4">
        <HeadlineCaps className="text-secondary-foreground/50 text-sm">
          you're all set
        </HeadlineCaps>
        <TitleL className="font-geist font-medium tracking-tighter text-balance">
          Gloop is excited. Let's go. 🎉
        </TitleL>
        <HeadlineS className="text-muted-foreground/80 text-balance">
          Your gut health journey starts right now with one simple meal log.
        </HeadlineS>
      </div>

      <div className="flex flex-col gap-3 w-full text-left">
        {[
          {
            emoji: "📅",
            title: "This week",
            body: "Log your meals and how you feel after. Don't overthink it.",
          },
          {
            emoji: "🔍",
            title: "After 14 days",
            body: "Gloop starts spotting patterns. You'll get your first AI insight.",
          },
          {
            emoji: "🏆",
            title: "After 30 days",
            body: "More clarity about your gut than years of guessing ever gave you.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-6 rounded-2xl px-4 py-3"
          >
            <span className="text-4xl mt-0.5">{item.emoji}</span>
            <div className="flex flex-col space-y-0.5">
              <TitleS className="text-base">{item.title}</TitleS>
              <Caption className="text-muted-foreground">{item.body}</Caption>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
