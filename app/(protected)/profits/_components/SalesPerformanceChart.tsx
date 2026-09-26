"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import type { FilterValue } from "@/components/stats/types";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/currency";

import type { SalesPerformanceValue } from "../_schemas/sales-performance-schema";

type SalesPerformanceChartProps = {
  trend: SalesPerformanceValue["trend"];
  filter: any;
};

const chartConfig = {
  revenue: {
    label: "Revenue",
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

export function SalesPerformanceChart({
  trend,
  filter,
}: SalesPerformanceChartProps) {
  return (
    <div className="flex-3">
      <ChartContainer
        config={chartConfig}
        className="h-70 w-full font-margarine"
      >
        <BarChart accessibilityLayer data={trend} barCategoryGap="5%">
          <CartesianGrid
            vertical={false}
            strokeOpacity={0.6}
            strokeDasharray="1 4"
            strokeLinecap="round"
          />

          <XAxis
            dataKey="timestamp"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => formatXAxis(value, filter)}
          />

          <YAxis
            tickLine={false}
            tickMargin={8}
            width={85}
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
                labelFormatter={(timestamp) =>
                  new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(String(timestamp)))
                }
                formatter={(value) => (
                  <div className="flex w-full items-center justify-between gap-6">
                    <span className="text-xs text-slate-500">Revenue</span>
                    <span className="font-quicksand font-bold tabular-nums text-highlight-soft">
                      {formatCurrency(Number(value))} MMK
                    </span>
                  </div>
                )}
              />
            }
          />

          <Bar
            dataKey="revenue"
            fill="var(--color-revenue)"
            radius={[4, 4, 0, 0]}
            maxBarSize={80}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

function formatXAxis(timestamp: string, filter: FilterValue) {
  const date = new Date(timestamp);

  if (filter.type === "period" && filter.period === "today") {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
    }).format(date);
  }

  if (filter.type === "period" && filter.period === "week") {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatCompactNumber(value: number) {
  if (value >= 1_000_000) {
    return `${value / 1_000_000}M`;
  }

  if (value >= 1_000) {
    return `${value / 1_000}K`;
  }

  return String(value);
}
