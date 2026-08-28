import { z } from "zod";

export const purchaseStatsSchema = z.object({
  totalAmount: z.number(),
  totalPurchases: z.number(),
  expectedProducts: z.number(),
  registeredProducts: z.number(),
});

export type PurchaseStats = z.infer<typeof purchaseStatsSchema>;
