import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function TitleL({ children, className }: Props) {
  return (
    <h1
      className={cn(
        "font-extrabold  tracking-tighter text-[36px] leading-[40px]",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function TitleM({ children, className }: Props) {
  return (
    <h1
      className={cn(
        "font-bold tracking-tighter text-[24px] leading-[32px]",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function TitleS({ children, className }: Props) {
  return (
    <h1
      className={cn(
        "font-semibold text-[18px] leading-[24px] tracking-tight",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function HeadlineL({ children, className }: Props) {
  return (
    <h2
      className={cn(
        "font-extrabold text-[16px] leading-[20px] tracking-tight text-muted-foreground/90",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function HeadlineM({ children, className }: Props) {
  return (
    <h2
      className={cn(
        "font-semibold text-[16px] leading-[20px] tracking-tight text-muted-foreground/90",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function HeadlineS({ children, className }: Props) {
  return (
    <h2
      className={cn(
        "font-medium text-[16px] leading-[20px] tracking-normal text-muted-foreground/90",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Caption({ children, className }: Props) {
  return (
    <span
      className={cn(
        "font-medium text-[14px] leading-[16px] text-primary/50",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function BodyL({ children, className }: Props) {
  return (
    <p className={cn("font-semibold text-[16px] leading-[24px]", className)}>
      {children}
    </p>
  );
}

export function BodyM({ children, className }: Props) {
  return (
    <p className={cn("font-medium text-[14px] leading-[18px]", className)}>
      {children}
    </p>
  );
}

export function BodyS({ children, className }: Props) {
  return (
    <p
      className={cn(
        "font-medium text-[12px] leading-[16px] tracking-[0.1px]",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function HeadlineCaps({ children, className }: Props) {
  return (
    <span
      className={cn(
        "font-semibold text-[12px] leading-[16px] tracking-wide uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
