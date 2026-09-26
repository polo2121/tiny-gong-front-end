"use client";

import DualText from "@/components/DualText";
import { DatePeriodFilter, useDatePeriodFilter } from "@/components/filters";
import { cn } from "@/lib/utils";
import { ProfitBreakdownChart } from "./ProfitBreakdownChart";

const ProfitBreakdown = () => {
  const datePeriodFilter = useDatePeriodFilter({ period: "month" });

  const revenue = 123232;
  const costOfProducts = 593533;
  const grossProfit = 958404;
  const expenses = 395093;
  const netProfit = 35353;

  return (
    <div className="rounded-xl bg-card">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 py-4">
        <DualText label="Profit Breakdown" subLabel="ပေးသွင်းသူအမည်" />
        <DatePeriodFilter
          value={datePeriodFilter.value}
          onChange={datePeriodFilter.onChange}
        />
      </header>

      {/* Financial rows */}
      <section className="flex gap-8 justify-center items-center">
        {/* Chart */}
        <div className="w-full flex-2">
          <ProfitBreakdownChart />
        </div>

        <div className="flex-1 flex flex-col gap-6 border p-4 border-dashed rounded-lg">
          <FinancialRow
            label="Revenue"
            subLabel="စုစုပေါင်းရောင်းရငွေ"
            value={revenue}
          />

          <FinancialRow
            label="Cost of Products"
            subLabel="ကုန်ပစ္စည်းကုန်ကျစရိတ်"
            value={costOfProducts}
            negative
            separator
          />

          <FinancialRow
            label="Gross Profit"
            subLabel="အကြမ်းအမြတ်"
            value={grossProfit}
          />

          <FinancialRow
            label="Expenses"
            subLabel="အသုံးစရိတ်"
            value={expenses}
            negative
            separator
          />

          <FinancialRow
            label="Net Profit"
            subLabel="အသားတင်အမြတ်"
            value={netProfit}
            special
          />
        </div>
      </section>
    </div>
  );
};
export default ProfitBreakdown;

type FinancialRowProps = {
  label: string;
  subLabel: string;
  value: number;
  negative?: boolean;
  separator?: boolean;
  special?: boolean;
};

export function FinancialRow({
  label,
  subLabel,
  value,
  negative = false,
  separator,
  special,
}: FinancialRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_10rem] items-start",
        separator && "border-b border-dashed pb-2",
        special && "rounded-lg bg-green-50 py-4 px-2",
      )}
    >
      <DualText label={label} subLabel={subLabel} size="sm" />

      <p
        className={cn(
          "text-right text-lg font-semibold tabular-nums",
          negative ? "text-destructive" : "text-foreground",
          special && "text-2xl text-highlight-soft font-bold ",
        )}
      >
        {negative ? "− " : ""}
        {value.toLocaleString("en-US")}
      </p>
    </div>
  );
}
