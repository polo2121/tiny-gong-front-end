"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { DatePeriod, DatePeriodValue } from "./schemas";

const periods: { label: string; value: DatePeriod }[] = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
  { label: "Custom", value: "custom" },
];

type DatePeriodFilterProps = {
  value: DatePeriodValue;
  onChange: (value: DatePeriodValue) => void;
  className?: string;
  disabled?: boolean;
};

export function DatePeriodFilter({
  value,
  onChange,
  className,
  disabled = false,
}: DatePeriodFilterProps) {
  function handlePeriodChange(nextPeriod: DatePeriod) {
    if (nextPeriod === "custom") {
      onChange({ ...value, period: nextPeriod });
      return;
    }

    onChange({ period: nextPeriod });
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Select
        items={periods}
        value={value.period}
        disabled={disabled}
        onValueChange={(nextPeriod) => {
          if (nextPeriod) handlePeriodChange(nextPeriod as DatePeriod);
        }}
      >
        <SelectTrigger aria-label="Choose date period" className="h-10 w-fit min-w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {periods.map((period) => (
            <SelectItem key={period.value} value={period.value}>
              {period.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {value.period === "custom" && (
        <div className="flex flex-wrap items-center gap-2">
          <Input
            type="date"
            aria-label="Start date"
            value={value.from ?? ""}
            max={value.to || undefined}
            disabled={disabled}
            onChange={(event) =>
              onChange({ ...value, from: event.currentTarget.value })
            }
            className="h-10 w-auto"
          />
          <span className="text-sm text-muted-foreground">to</span>
          <Input
            type="date"
            aria-label="End date"
            value={value.to ?? ""}
            min={value.from || undefined}
            disabled={disabled}
            onChange={(event) =>
              onChange({ ...value, to: event.currentTarget.value })
            }
            className="h-10 w-auto"
          />
        </div>
      )}
    </div>
  );
}
