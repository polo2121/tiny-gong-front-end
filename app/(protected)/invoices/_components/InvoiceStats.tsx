"use client";

import { useState } from "react";

import { Alert } from "@/components/ui/alert";
import { formatCurrency } from "@/lib/currency";
import StatCard from "@/components/stats/StatCard";
import { StatsSection } from "@/components/stats/StatsSection";
import { StatsPeriodSelector } from "@/components/stats/StatsPeriodSelector";
import type { DashboardPeriod } from "@/components/stats/types";

import { useInvoiceStats } from "../_hooks/use-invoice-stats";

const InvoiceStats = () => {
  const [period, setPeriod] = useState<DashboardPeriod>("today");
  const { data: stats, isLoading, isError } = useInvoiceStats(period);

  return (
    <StatsSection
      controls={
        <StatsPeriodSelector value={period} onValueChange={setPeriod} />
      }
    >
      {isLoading && <InvoiceStatsSkeleton />}

      {isError && (
        <div className="md:col-span-2 xl:col-span-4">
          <Alert
            tone="destructive"
            title="Could not load invoice stats"
            description="Please try again in a moment."
          />
        </div>
      )}

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
            label="Paid Amount"
            subLabel="ပေးချေပြီးငွေ"
            value={formatCurrency(stats.paidAmount)}
            unit="MMK"
            tone="purple"
          />
          <StatCard
            label="Outstanding"
            subLabel="ကျန်ရှိငွေ"
            value={formatCurrency(stats.outstandingAmount)}
            unit="MMK"
            tone="amber"
          />
          <StatCard
            label="Invoices"
            subLabel="ဘောင်ချာအရေအတွက်"
            value={stats.totalInvoices}
            tone="pink"
          />
        </>
      )}
    </StatsSection>
  );
};

function InvoiceStatsSkeleton() {
  return Array.from({ length: 4 }).map((_, index) => (
    <div
      key={index}
      className="min-h-32 animate-pulse rounded-2xl border border-slate-100 bg-slate-100 shadow-card"
    />
  ));
}

export default InvoiceStats;
