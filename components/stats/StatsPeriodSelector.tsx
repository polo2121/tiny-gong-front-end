"use client";

import { OneSparkleIcon } from "@/components/icons/OneSparkleIcon";
import { cn } from "@/lib/utils";

import type { DashboardPeriod } from "./types";

type StatsPeriod = {
  label: string;
  value: DashboardPeriod;
};

type StatsPeriodSelectorProps = {
  value: DashboardPeriod;
  onValueChange: (period: DashboardPeriod) => void;
  isInactive?: boolean;
};

const periods: StatsPeriod[] = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "week" },
  { label: "Last Month", value: "month" },
  { label: "All Time", value: "all" },
];

export function StatsPeriodSelector({
  value,
  onValueChange,
  isInactive = false,
}: StatsPeriodSelectorProps) {
  return (
    <div className="flex flex-wrap justify-start gap-2">
      {periods.map((period) => {
        const isActive = !isInactive && value === period.value;

        return (
          <button
            key={period.value}
            type="button"
            onClick={() => onValueChange(period.value)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 cursor-pointer",
              isActive
                ? "bg-highlight/10 text-hightlight shadow-card"
                : "text-foreground/55 hover:bg-slate-100 hover:text-foreground",
            )}
          >
            {period.label}
            {isActive && (
              <OneSparkleIcon className="absolute top-1 right-4 text-yellow-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}
