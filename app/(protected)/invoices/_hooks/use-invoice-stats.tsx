import { useQuery } from "@tanstack/react-query";
import type { DashboardPeriod } from "@/components/stats/types";

import {
  invoiceStatsSchema,
  type InvoiceStats,
} from "../_schema/invoice-schema";

const invoiceStatsQueryKey = ["invoice-stats"] as const;

const sampleInvoiceStats: Record<DashboardPeriod, InvoiceStats> = {
  today: {
    totalAmount: 125000,
    paidAmount: 95000,
    outstandingAmount: 30000,
    totalInvoices: 8,
  },
  week: {
    totalAmount: 865000,
    paidAmount: 720000,
    outstandingAmount: 145000,
    totalInvoices: 42,
  },
  month: {
    totalAmount: 2840000,
    paidAmount: 2310000,
    outstandingAmount: 530000,
    totalInvoices: 136,
  },
  all: {
    totalAmount: 18450000,
    paidAmount: 16120000,
    outstandingAmount: 2330000,
    totalInvoices: 912,
  },
};

export function useInvoiceStats(period: DashboardPeriod) {
  return useQuery({
    queryKey: [...invoiceStatsQueryKey, period],
    queryFn: async () => {
      // Backend trace: replace this sample data with apiRequest when the
      // invoice stats endpoint is ready.
      return invoiceStatsSchema.parse(sampleInvoiceStats[period]);
    },
  });
}
