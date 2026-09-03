import { z } from "zod";

export const purchaseStatsSchema = z.object({
  totalPurchases: z.number(),
  purchaseValue: z.number(),
  totalProducts: z.number(),
  totalVariants: z.number(),
});

export const purchaseStatsApiResponseSchema = z.object({
  stats: purchaseStatsSchema,
});

export type PurchaseStats = z.infer<typeof purchaseStatsSchema>;
