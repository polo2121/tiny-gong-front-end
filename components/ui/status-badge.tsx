import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type StatusBadgeTone = "success" | "warning" | "neutral" | "danger";

const statusBadgeToneClassName: Record<StatusBadgeTone, string> = {
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-orange-100 text-orange-700",
  neutral: "bg-slate-100 text-slate-600",
  danger: "bg-danger-soft text-danger",
};

interface StatusBadgeProps extends ComponentProps<"span"> {
  tone?: StatusBadgeTone;
}

export function StatusBadge({
  tone = "neutral",
  className,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold",
        statusBadgeToneClassName[tone],
        className,
      )}
      {...props}
    />
  );
}
