import { z } from "zod";

export const salesPerformanceTrendPointSchema = z.object({
  timestamp: z.string(),
  revenue: z.number().nonnegative(),
});

export const salesPerformanceSchema = z.object({
  summary: z.object({
    totalSales: z.number().nonnegative(),
    itemsSold: z.number().nonnegative(),
    averageSaleValue: z.number().nonnegative(),
    averageItemsPerSale: z.number().nonnegative(),
  }),

  trend: z.array(salesPerformanceTrendPointSchema),
});

export const salesPerformanceApiResponseSchema = z.object({
  performance: salesPerformanceSchema.nullable(),
});

export type SalesPerformanceValue = z.infer<typeof salesPerformanceSchema>;
export type salesPerformanceApiResponseValue = z.infer<
  typeof salesPerformanceApiResponseSchema
>;
