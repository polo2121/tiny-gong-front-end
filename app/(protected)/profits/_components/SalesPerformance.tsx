"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";

import DualText from "@/components/DualText";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SalesPerformanceChart } from "./SalesPerformanceChart";
import { SalesPerformanceSummary } from "./SalesPerformanceSummary";
import { useSalesPerformance } from "../_hooks/use-sales-performance";

type BarChartPeriod = "week" | "month" | "year" | "custom";

export type BarChartFilter = {
  period: BarChartPeriod;
  from?: string;
  to?: string;
};

const periods = [
  { label: "Weekly", value: "week" },
  { label: "Monthly", value: "month" },
  { label: "Yearly", value: "year" },
  { label: "Custom", value: "custom" },
] as const;

export function SalesPerformance() {
  const [barChartFilter, setBarChartFilter] = useState<BarChartFilter>({
    period: "week",
  });

  const {
    data: performance,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useSalesPerformance(barChartFilter);

  // -----------------------------
  // Query states
  // -----------------------------

  const isInitialLoading = isPending;

  const isInitialError = isError && performance === undefined;

  const isEmpty = performance === null;

  const hasData = performance != null;

  const isRefreshing = hasData && isFetching && !isError;

  const isRefreshError = hasData && isError;

  // -----------------------------
  // Handlers
  // -----------------------------

  const handlePeriodChange = (value: string | null) => {
    if (!value) return;

    const period = periods.find((period) => period.value === value);

    if (!period) return;

    setBarChartFilter((prev) => ({
      ...prev,
      period: period.value,
    }));
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarChartFilter((prev) => ({
      ...prev,
      from: e.target.value,
    }));
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarChartFilter((prev) => ({
      ...prev,
      to: e.target.value,
    }));
  };

  return (
    <section className="mt-4 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <DualText
          label="Sales Performance"
          subLabel="အရောင်းစွမ်းဆောင်ရည်"
          size="md"
        />

        {/* Filters */}
        <div
          role="group"
          aria-label="Sales performance date filters"
          className="flex flex-wrap items-center gap-2"
        >
          <Select
            items={periods}
            value={barChartFilter.period}
            onValueChange={handlePeriodChange}
          >
            <SelectTrigger className=" border-highlight min-h-0 h-fit py-1 w-fit rounded-sm shadow-2xs font-semibold">
              <SelectValue className="text-highlight " />
            </SelectTrigger>

            <SelectContent className="border border-dashed border-white rounded-lg shadow-none h-fit">
              {periods.map((period) => (
                <SelectItem
                  key={period.value}
                  value={period.value}
                  className="font-semibold p-2 h-fit"
                >
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Custom date range */}
          {barChartFilter.period === "custom" && (
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  type="date"
                  aria-label="From date"
                  value={barChartFilter.from ?? ""}
                  onChange={handleFromChange}
                  max={barChartFilter.to}
                  className="pl-9"
                />
              </div>

              <span className="text-sm text-muted-foreground">to</span>

              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  type="date"
                  aria-label="To date"
                  value={barChartFilter.to ?? ""}
                  onChange={handleToChange}
                  min={barChartFilter.from}
                  className="pl-9"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Initial loading */}
      {isInitialLoading && (
        <div
          role="status"
          className="h-[360px] animate-pulse rounded-2xl bg-muted"
        >
          <span className="sr-only">Loading sales performance</span>
        </div>
      )}

      {/* Initial error */}
      {isInitialError && (
        <Alert
          tone="destructive"
          title="Could not load sales performance"
          description="Please try again in a moment."
        >
          <Button
            type="button"
            size="sm"
            variant="outline"
            showIcon={false}
            className="mt-3"
            disabled={isFetching}
            onClick={() => void refetch()}
          >
            {isFetching ? "Retrying…" : "Try again"}
          </Button>
        </Alert>
      )}

      {/* Empty */}
      {isEmpty && (
        <Alert
          title="No sales activity yet"
          description="There are no sales for this period. Try another date range."
        />
      )}

      {/* Background refetch */}
      {isRefreshing && (
        <p role="status" className="text-sm text-muted-foreground">
          Updating sales performance…
        </p>
      )}

      {/* Refetch failed but old data exists */}
      {isRefreshError && (
        <Alert
          tone="destructive"
          title="Could not refresh sales performance"
          description="Showing the last available results for this period."
        />
      )}

      {/* Success */}
      {hasData && (
        <div className="flex gap-10">
          <SalesPerformanceSummary summary={performance.summary} />

          <SalesPerformanceChart
            trend={performance.trend}
            filter={barChartFilter}
          />
        </div>
      )}
    </section>
  );
}
