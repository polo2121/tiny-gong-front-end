// invoices/_schemas/invoice-stats-schema.ts

import { z } from "zod";

export const invoiceStatsSchema = z.object({
  totalAmount: z.number(),
  paidAmount: z.number(),
  outstandingAmount: z.number(),
  totalInvoices: z.number(),
});

export type InvoiceStats = z.infer<
  typeof invoiceStatsSchema
>;