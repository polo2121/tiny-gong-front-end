import { useQuery } from "@tanstack/react-query";

import type { DashboardPeriod } from "@/components/stats/types";

import {
  purchaseStatsSchema,
  type PurchaseStats,
} from "../_schemas/purchase-stats-schema";

const purchaseStatsQueryKey = ["purchase-stats"] as const;

const samplePurchaseStats: Record<DashboardPeriod, PurchaseStats> = {
  today: {
    totalAmount: 420000,
    totalPurchases: 3,
    expectedProducts: 18,
    registeredProducts: 11,
  },
  week: {
    totalAmount: 1850000,
    totalPurchases: 12,
    expectedProducts: 74,
    registeredProducts: 52,
  },
  month: {
    totalAmount: 6420000,
    totalPurchases: 38,
    expectedProducts: 238,
    registeredProducts: 181,
  },
  all: {
    totalAmount: 28450000,
    totalPurchases: 164,
    expectedProducts: 978,
    registeredProducts: 824,
  },
};

export function usePurchaseStats(period: DashboardPeriod) {
  return useQuery({
    queryKey: [...purchaseStatsQueryKey, period],
    queryFn: async () => {
      // Backend trace: replace this sample data with apiRequest when the
      // purchase stats endpoint is ready.
      return purchaseStatsSchema.parse(samplePurchaseStats[period]);
    },
  });
}
