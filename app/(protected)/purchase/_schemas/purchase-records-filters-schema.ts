// _schemas/purchase-filter.schema.ts

import { z } from "zod";

export const purchaseRecordFilterSchema = z.object({
  search: z.string().trim().catch(""),
  status: z.enum(["all", "complete", "incomplete"]).catch("all"),
});

export type PurchaseRecordFilters = z.infer<typeof purchaseRecordFilterSchema>;