"use client";

import { useState } from "react";
import { CustomDateFilter } from "@/components/filters/CustomDateFilter";
import StatCard from "@/components/stats/StatCard";
import { StatsPeriodSelector } from "@/components/stats/StatsPeriodSelector";
import { StatsSection } from "@/components/stats/StatsSection";
import type {
  CustomDateFilterValue,
  DashboardPeriod,
  FilterValue,
} from "@/components/stats/types";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { useProfitStats } from "../_hooks/use-profit-stats";
import { ProfitStatsValue } from "../_schemas/profit-stats-schema";

type ProfitStatsContentProps = {
  stats: ProfitStatsValue | null | undefined;
  isPending: boolean;
  isError: boolean;
  isFetching: boolean;
  onRetry: () => void;
};
type ProfitStatsErrorProps = {
  title: string;
  description: string;
  isRetrying: boolean;
  onRetry: () => void;
};
type ProfitStatsCardsProps = {
  stats: ProfitStatsValue;
};

export default function ProfitStats() {
  const [filter, setFilter] = useState<FilterValue>({
    type: "period",
    period: "month",
  });

  const {
    data: stats,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useProfitStats(filter);

  const handlePeriodChange = (period: DashboardPeriod) => {
    setFilter({ type: "period", period });
  };

  const handleCustomDates = (dates: CustomDateFilterValue) => {
    setFilter({ type: "custom", dates });
  };

  return (
    <StatsSection
      controls={
        <>
          <StatsPeriodSelector
            value={filter.type === "period" ? filter.period : "today"}
            onValueChange={handlePeriodChange}
            isInactive={filter.type === "custom"}
          />

          <CustomDateFilter
            defaultDates={filter.type === "custom" ? filter.dates : null}
            onApply={handleCustomDates}
          />
        </>
      }
    >
      <ProfitStatsContent
        stats={stats}
        isPending={isPending}
        isError={isError}
        isFetching={isFetching}
        onRetry={() => void refetch()}
      />
    </StatsSection>
  );
}

function ProfitStatsContent({
  stats,
  isPending,
  isError,
  isFetching,
  onRetry,
}: ProfitStatsContentProps) {
  // 1. INITIAL LOADING

  if (isPending) {
    return <ProfitStatsSkeleton />;
  }

  // 2. INITIAL ERROR

  if (isError && stats === undefined) {
    return (
      <ProfitStatsError
        title="Could not load profit metrics"
        description="Please try again in a moment."
        isRetrying={isFetching}
        onRetry={onRetry}
      />
    );
  }

  // 3. EMPTY

  if (stats === null) {
    return <ProfitStatsEmpty />;
  }

  // 4. SUCCESS / REFRESHING / REFRESH ERROR

  if (stats !== undefined) {
    return (
      <>
        {/* 5. REFRESH ERROR */}

        {isError && (
          <ProfitStatsError
            title="Could not refresh profit metrics"
            description="Showing the last available results for this period."
            isRetrying={isFetching}
            onRetry={onRetry}
          />
        )}

        {/* 6. REFRESHING */}

        {isFetching && !isError && (
          <p role="status">Updating profit metrics…</p>
        )}

        {/* 4. SUCCESS DATA */}

        <ProfitStatsCards stats={stats} />
      </>
    );
  }

  return null;
}

export function ProfitStatsSkeleton() {
  return (
    <>
      <span role="status" className="sr-only">
        Loading profit metrics
      </span>

      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="min-h-40 rounded-2xl border border-slate-100 bg-slate-100 shadow-card motion-safe:animate-pulse"
        />
      ))}
    </>
  );
}

export function ProfitStatsError({
  title,
  description,
  isRetrying,
  onRetry,
}: ProfitStatsErrorProps) {
  return (
    <Alert
      className="md:col-span-2 xl:col-span-4"
      tone="destructive"
      title={title}
      description={description}
    >
      <Button
        type="button"
        size="sm"
        variant="outline"
        showIcon={false}
        className="mt-3 bg-white border-0"
        disabled={isRetrying}
        onClick={onRetry}
      >
        {isRetrying ? "Retrying…" : "Try again"}
      </Button>
    </Alert>
  );
}

export function ProfitStatsEmpty() {
  return (
    <Alert
      className="md:col-span-2 xl:col-span-4"
      title="No profit activity yet"
      description="There are no sales or expenses for this period. Try another date range."
    />
  );
}

export function ProfitStatsCards({ stats }: ProfitStatsCardsProps) {
  return (
    <>
      <StatCard
        label="Revenue"
        subLabel="ရောင်းရငွေ"
        value={formatCurrency(stats.revenue)}
        unit="MMK"
        tone="purple"
      />

      <StatCard
        label="Gross Profit"
        subLabel="အကြမ်းအမြတ်"
        value={formatCurrency(stats.grossProfit)}
        unit="MMK"
        tone="teal"
      />

      <StatCard
        label="Expenses"
        subLabel="အသုံးစရိတ်"
        value={formatCurrency(stats.expenses)}
        unit="MMK"
        tone="amber"
      />

      <StatCard
        label="Net Profit"
        subLabel="အသားတင်အမြတ်"
        value={formatCurrency(stats.netProfit)}
        unit="MMK"
        tone="pink"
      />
    </>
  );
}
