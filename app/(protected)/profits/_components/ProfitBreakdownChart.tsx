"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/currency";

const data = [
  { label: "Revenue", amount: 123232 },
  { label: "Product cost", amount: 593533 },
  { label: "Gross profit", amount: 958404 },
  { label: "Expenses", amount: 395093 },
  { label: "Net profit", amount: 35353 },
];

const chartConfig = {
  amount: {
    label: "Amount",
    color: "#0097A7",
  },
} satisfies ChartConfig;

function formatMMKAxis(value: number) {
  const number = new Intl.NumberFormat("my-MM", {
    maximumFractionDigits: 1,
  });

  if (Math.abs(value) >= 100_000) {
    return `${number.format(value / 100_000)} သိန်း`;
  }

  if (Math.abs(value) >= 10_000) {
    return `${number.format(value / 10_000)} သောင်း`;
  }

  return number.format(value);
}

export function ProfitBreakdownChart() {
  return (
    <ChartContainer config={chartConfig} className="h-70 w-full font-margarine">
      <BarChart accessibilityLayer data={data} barCategoryGap="18%">
        <CartesianGrid
          vertical={false}
          strokeOpacity={0.6}
          strokeDasharray="1 4"
          strokeLinecap="round"
        />

        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={0}
        />

        <YAxis
          tickLine={false}
          tickMargin={8}
          width={60}
          tickFormatter={formatMMKAxis}
          axisLine={{
            stroke: "#94a3b8",
            strokeDasharray: "2 4",
            strokeOpacity: 0.4,
          }}
        />

        <ChartTooltip
          cursor={{ fill: "#0097A7", fillOpacity: 0.08 }}
          content={
            <ChartTooltipContent
              className="min-w-44 border border-slate-100 bg-white p-3 shadow-lg"
              labelClassName="mb-1 font-margarine text-slate-500"
              formatter={(value) => (
                <div className="flex w-full items-center justify-between gap-6">
                  <span className="text-xs text-slate-500">Amount</span>
                  <span className="font-quicksand font-bold tabular-nums text-highlight-soft">
                    {formatCurrency(Number(value))} MMK
                  </span>
                </div>
              )}
            />
          }
        />

        <Bar
          dataKey="amount"
          fill="var(--color-amount)"
          radius={[4, 4, 0, 0]}
          maxBarSize={80}
        />
      </BarChart>
    </ChartContainer>
  );
}
