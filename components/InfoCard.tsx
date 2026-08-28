import type { ComponentProps, ReactNode } from "react";

import DualText from "@/components/DualText";
import { cn } from "@/lib/utils";
import { FloatingSparklesIcon } from "./icons/FloatingSparklesIcon";
import { ScatteredDotsIcon } from "./icons/ScatteredDotsIcon";

export type CardTone = "teal" | "pink" | "amber" | "purple";

export const cardStyles: Record<
  CardTone,
  {
    card: string;
    icon: ReactNode;
    value: string;
  }
> = {
  teal: {
    card: "border-teal-100 bg-teal-50",
    icon: <FloatingSparklesIcon className="size-10 text-teal-600/20" />,
    value: "text-teal-900",
  },
  pink: {
    card: "bg-pink-50",
    icon: <ScatteredDotsIcon className="text-pink-600/20" />,
    value: "text-pink-900",
  },
  amber: {
    card: "bg-yellow-50",
    icon: <FloatingSparklesIcon className="size-10 text-yellow-600/20" />,
    value: "text-yellow-900",
  },
  purple: {
    card: "bg-purple-50",
    icon: <ScatteredDotsIcon className="text-purple-600/20" />,
    value: "text-purple-900",
  },
};

export interface InfoCardBaseProps extends ComponentProps<"div"> {
  label: string;
  subLabel: string;
  tone?: CardTone;
  children: ReactNode;
}

export default function InfoCard({
  label,
  subLabel,
  tone = "teal",
  children,
  className,
  ...props
}: InfoCardBaseProps) {
  const styles = cardStyles[tone];

  return (
    <div
      className={cn(
        "flex min-h-40 flex-col justify-between rounded-2xl px-8 py-6 shadow-card ",
        styles.card,
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-4 ">
        <DualText label={label} subLabel={subLabel} size="sm" />

        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-end rounded-full",
          )}
        >
          {styles.icon}
        </span>
      </div>

      {children}
    </div>
  );
}
