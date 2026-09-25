import { z } from "zod";

// -----------------------------------------------------------------------------
// Purchase Records
// -----------------------------------------------------------------------------
export const purchaseRecordSchema = z.object({
  id: z.string(),
  supplier: z.string(),
  date: z.string(),
  totalPrice: z.number().nullable(),
  note: z.string().nullable().optional(),
});

export const purchaseRecordApiResponseSchema = z.object({
  purchaseRecords: z.array(purchaseRecordSchema),
});

export const purchaseRecordFormValuesSchema = purchaseRecordSchema.omit({
  id: true,
});

export type PurchaseRecord = z.infer<typeof purchaseRecordSchema>;
export type PurchaseRecordApiResponse = z.infer<typeof purchaseRecordApiResponseSchema>;
export type PurchaseRecordFormValues = z.infer<typeof purchaseRecordFormValuesSchema>;



