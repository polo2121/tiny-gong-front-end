import { useQuery } from "@tanstack/react-query";
import { fetchProfitStats } from "../_services/profit-api";
import type { FilterValue } from "@/components/stats/types";

export function useProfitStats(filter: FilterValue) {
  return useQuery({
    queryKey: ["profit-stats", filter],
    queryFn: () => fetchProfitStats(filter),
  });
}
