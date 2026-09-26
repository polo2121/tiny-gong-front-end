import type { FilterValue } from "@/components/stats/types";
import { apiRequest } from "@/lib/api/api.request";
import { profitStatsApiResponseSchema } from "../_schemas/profit-stats-schema";
import {salesPerformanceApiResponseSchema} from "../_schemas/sales-performance-schema"

const profitApiBaseUrl =
  process.env.NEXT_PUBLIC_PROFIT_API_URL ?? "http://localhost:8787/profits";

export async function fetchProfitStats(filter: FilterValue) {
  const url = new URL(`${profitApiBaseUrl.replace(/\/$/, "")}/stats`);

  if(filter.type === "custom") {
    url.searchParams.set("from", filter.dates.from);
    url.searchParams.set("to", filter.dates.to);
  } else {
    url.searchParams.set("period", filter.period);
  }

  const data = await apiRequest({
    url: url.toString(),
    schema: profitStatsApiResponseSchema,
  });

  return data.stats;
}

export async function fetchSalesPerformance(
  filter: FilterValue,
) {

  console.log("hello")
  const url = new URL(`${profitApiBaseUrl.replace(/\/$/, "")}/sales/performance`);
  if (filter.type === "custom") {
    url.searchParams.set("from", filter.dates.from);
    url.searchParams.set("to", filter.dates.to);

  } else {
    url.searchParams.set("period", filter.period);
  }
  console.log("fetching now")

  const data = await apiRequest({
    url: url.toString(),
    schema: salesPerformanceApiResponseSchema,
  });
    console.log("end")

  return data.performance;

}