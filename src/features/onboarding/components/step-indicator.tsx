// 8 step line indicator

import { Progress } from "@/components/ui/progress";

interface StepIndicatorProps {
  step: number;
  total: number;
}

export function StepIndicator({ step, total }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center w-full gap-2">
      <Progress
        className="h-2 bg-primary/5"
        value={(step / total) * 100}
        max={total}
      />
    </div>
  );
}
