import type { ReactNode } from "react";

import { DestructiveAlertIcon } from "@/components/icons/DestructiveAlertIcon";
import { SearchNotFoundIcon } from "../icons/SearchNotFoundIcon";
import { cn } from "@/lib/utils";

type AlertTone = "default" | "destructive" | "success" | "warning";

type AlertProps = {
  tone?: AlertTone;
  title?: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
};

const alertIcons: Record<AlertTone, ReactNode> = {
  default: <SearchNotFoundIcon className="size-8" />,
  destructive: <DestructiveAlertIcon className="size-9" />,
  success: <DestructiveAlertIcon className="size-7" />,
  warning: <DestructiveAlertIcon className="size-7" />,
};

const alertToneStyles: Record<AlertTone, string> = {
  default: "border-highlight/20 bg-highlight/5 text-highlight",
  destructive: "border-destructive/20 bg-destructive/5 text-destructive",
  success: "border-emerald-600/20 bg-emerald-50 text-emerald-700",
  warning: "border-amber-500/25 bg-amber-50 text-amber-700",
};

export function Alert({
  tone = "default",
  title,
  description,
  icon,
  className,
  children,
}: AlertProps) {
  const defaultIcon = alertIcons[tone];
  return (
    <div
      role={tone === "destructive" ? "alert" : "status"}
      className={cn(
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 motion-safe:zoom-in-95 motion-safe:duration-200 motion-reduce:animate-none flex items-start gap-3 rounded-lg border px-4 py-3 text-sm",
        alertToneStyles[tone],
        className,
      )}
    >
      <span className="mt-0.5 shrink-0">{icon ?? defaultIcon}</span>

      <div className="min-w-0">
        {title && <p className="font-margarine leading-5">{title}</p>}
        {description && (
          <p className="leading-5 opacity-85 font-medium">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
