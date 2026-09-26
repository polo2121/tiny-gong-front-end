import { formatCurrency } from "@/lib/currency";

import type { SalesPerformanceValue } from "../_schemas/sales-performance-schema";

type SalesPerformanceSummaryProps = {
  summary: SalesPerformanceValue["summary"];
};

export function SalesPerformanceSummary({
  summary,
}: SalesPerformanceSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-2 flex-1">
      <SummaryItem
        label="Total Sales"
        value={summary.totalSales.toLocaleString()}
      />

      <SummaryItem
        label="Items Sold"
        value={summary.itemsSold.toLocaleString()}
      />

      <SummaryItem
        label="Average Sale (MMK)"
        value={`${formatCurrency(summary.averageSaleValue)}`}
      />

      <SummaryItem
        label="Items / Sale"
        value={summary.averageItemsPerSale.toFixed(1)}
      />
    </div>
  );
}

type SummaryItemProps = {
  label: string;
  value: string;
};

function SummaryItem({ label, value }: SummaryItemProps) {
  return (
    <div className="bg-slate-50 flex flex-col justify-center items-center rounded-xl border border-slate-200">
      <p className="mt-1 text-xl font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground font-margarine font-normal">
        {label}
      </p>
    </div>
  );
}
