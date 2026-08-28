"use client";

import { useState } from "react";

import { Alert } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/currency";
import StatCard from "@/components/stats/StatCard";
import { StatsSection } from "@/components/stats/StatsSection";
import { StatsPeriodSelector } from "@/components/stats/StatsPeriodSelector";
import type { DashboardPeriod } from "@/components/stats/types";

import { usePurchaseStats } from "../_hooks/use-purchase-stats";
import { CustomDateFilterValue } from "@/components/filters/CustomDateFilter";
import { CustomDateFilter } from "@/components/filters/CustomDateFilter";

const PurchaseStats = () => {
  const [period, setPeriod] = useState<DashboardPeriod>("today");
  const [customDate, setCustomDate] = useState<CustomDateFilterValue | null>(
    null,
  );
  const { data: stats, isLoading, isError } = usePurchaseStats(period);

  function handlePeriodChange(nextPeriod: DashboardPeriod) {
    setPeriod(nextPeriod);
    setCustomDate(null);
  }

  return (
    <StatsSection
      controls={
        <>
          <StatsPeriodSelector
            value={period}
            onValueChange={handlePeriodChange}
            isInactive={Boolean(customDate)}
          />

          <CustomDateFilter defaultDates={customDate} onApply={setCustomDate} />
        </>
      }
    >
      {isLoading && <PurchaseStatsSkeleton />}

      {isError && (
        <div className="md:col-span-2 xl:col-span-4">
          <Alert
            tone="destructive"
            title="Could not load purchase stats"
            description="Please try again in a moment."
          />
        </div>
      )}
      {/* 
      <div className="md:col-span-2 xl:col-span-4">
        <Alert
          tone="default"
          title="Oops! No Match Found."
          description="There's not match found in the records."
        />
      </div> */}

      {stats && (
        <>
          <StatCard
            label="Total Amount"
            subLabel="စုစုပေါင်းငွေပမာဏ"
            value={formatCurrency(stats.totalAmount)}
            unit="MMK"
            tone="teal"
          />
          <StatCard
            label="Purchases"
            subLabel="ဝယ်ယူမှုအရေအတွက်"
            value={stats.totalPurchases}
            tone="purple"
          />
          <StatCard
            label="Expected Products"
            subLabel="မျှော်မှန်းကုန်ပစ္စည်း"
            value={stats.expectedProducts}
            tone="amber"
          />
          <StatCard
            label="Registered Products"
            subLabel="စာရင်းသွင်းပြီးကုန်ပစ္စည်း"
            value={stats.registeredProducts}
            tone="pink"
          />
        </>
      )}
    </StatsSection>
  );
};

function PurchaseStatsSkeleton() {
  return Array.from({ length: 4 }).map((_, index) => (
    <div
      key={index}
      className="min-h-32 animate-pulse rounded-2xl border border-slate-100 bg-slate-100 shadow-card"
    />
  ));
}

export default PurchaseStats;
