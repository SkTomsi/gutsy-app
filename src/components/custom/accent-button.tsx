import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function AccentButton({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        "bg-emerald-600 h-12 font-extrabold text-base rounded-xl border-2 border-emerald-700 active:translate-y-[4px] active:shadow-[0_0]  hover:text-white transition-all duration-300 ease-out shadow-[0_4px_0_0_--tw-shadow-color] shadow-emerald-700",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
