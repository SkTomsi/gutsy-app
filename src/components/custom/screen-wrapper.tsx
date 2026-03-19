//this is a wrapper for the screen, and should have classname type to extend builtin tailwind classes

import { cn } from "@/lib/utils";

interface ScreenWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function ScreenWrapper({ children, className }: ScreenWrapperProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 px-4  w-full min-h-dvh relative",
        className,
      )}
    >
      {children}
    </div>
  );
}
