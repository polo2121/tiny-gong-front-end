import { useQuery } from "@tanstack/react-query";

import type { DashboardPeriod } from "@/components/stats/types";
import type { CustomDateFilterValue } from "@/components/filters/CustomDateFilter";

import { fetchPurchaseStats } from "../_services/purchase-api";

const purchaseStatsQueryKey = ["purchase-stats"] as const;

type UsePurchaseStatsOptions = {
  period: DashboardPeriod;
  customDate: CustomDateFilterValue | null;
};

export function usePurchaseStats({
  period,
  customDate,
}: UsePurchaseStatsOptions) {
  return useQuery({
    queryKey: [...purchaseStatsQueryKey, { period, customDate }],
    queryFn: () => fetchPurchaseStats({ period, customDate }),
    placeholderData: (previousStats) => previousStats,
  });
}
