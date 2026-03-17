import type React from "react";
import { useCallback } from "react";
import { useWebHaptics } from "web-haptics/react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type HapticSegment = { duration: number; intensity?: number; delay?: number };

interface AccentButtonColors {
  bg: string;
  border: string;
  shadow?: string;
}

interface AccentButtonProps extends React.ComponentProps<typeof Button> {
  pattern?: HapticSegment[];
  colors?: AccentButtonColors;
}

const DEFAULT_PATTERN: HapticSegment[] = [{ duration: 50, intensity: 0.5 }];

const DEFAULT_COLORS: AccentButtonColors = {
  bg: "bg-emerald-600 dark:bg-emerald-700 ",
  border: "border-emerald-700 dark:border-emerald-800",
  shadow: "shadow-emerald-700 dark:shadow-emerald-800",
};

export default function AccentButton({
  children,
  className,
  onClick,
  pattern = DEFAULT_PATTERN,
  colors = DEFAULT_COLORS,
  ...props
}: AccentButtonProps) {
  const { trigger } = useWebHaptics({ debug: true });

  const handleOnClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      trigger(pattern);
      onClick?.(e);
    },
    [trigger, onClick, pattern],
  );

  return (
    <Button
      className={cn(
        "h-12 font-extrabold text-base rounded-xl border-2 relative overflow-clip z-0 ",
        "active:translate-y-[4px] active:shadow-[0_0]",
        "transition-all duration-300 ease-out",
        "shadow-[0_4px_0_0_--tw-shadow-color]",
        "before:bg-transparent hover:before:bg-white/15 before:inset-0 before:absolute before:w-full before:h-full before:bg-clip-border before:-z-10",
        colors.bg,
        colors.border,
        colors.shadow ?? colors.border,
        className,
      )}
      onClick={handleOnClick}
      {...props}
    >
      {children}
    </Button>
  );
}
