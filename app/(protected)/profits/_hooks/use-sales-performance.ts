import { useQuery } from "@tanstack/react-query";

import type { FilterValue } from "@/components/stats/types";

import { fetchSalesPerformance } from "../_services/profit-api";

export function useSalesPerformance(
  filter: FilterValue,
) {
  return useQuery({
    queryKey: ["sales-performance", filter],
    queryFn: () => fetchSalesPerformance(filter),
  });
}