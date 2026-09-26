import { z } from "zod";

export const profitStatsSchema = z.object({
  revenue: z.number(),
  grossProfit: z.number(),
  expenses: z.number(),
  netProfit: z.number(),
});

// Null means no activity in the period. Zero and negative profits are valid data.
export const profitStatsApiResponseSchema = z.object({
  stats: profitStatsSchema.nullable(),
});

export type ProfitStatsValue = z.infer<typeof profitStatsSchema>;
