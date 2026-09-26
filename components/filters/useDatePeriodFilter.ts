"use client";

import { useState } from "react";

import type { DatePeriod, DatePeriodValue } from "./schemas";

export function useDatePeriodFilter(
  initialValue: DatePeriodValue = { period: "week" },
) {
  const [value, setValue] = useState<DatePeriodValue>(initialValue);

  function onChange(nextValue: DatePeriodValue) {
    setValue(nextValue);
  }

  function setPeriod(period: DatePeriod) {
    setValue((current) =>
      period === "custom"
        ? { ...current, period }
        : { period },
    );
  }

  function setCustomDates(from: string, to: string) {
    setValue((current) => ({ ...current, period: "custom", from, to }));
  }

  return {
    value,
    onChange,
    setPeriod,
    setCustomDates,
  };
}
