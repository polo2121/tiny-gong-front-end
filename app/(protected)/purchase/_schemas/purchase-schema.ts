import { z } from "zod";

const requiredNumber = (message: string) =>
  z.number({ message }).min(1, message);

export const purchaseFormSchema = z.object({
  supplier: z.string().trim().min(1, "Supplier is required."),
  purchaseDate: z.string().trim().min(1, "Purchase date is required."),
  expectedProducts: requiredNumber("Products must be at least 1."),
  totalPrice: requiredNumber("Amount must be at least 1000."),
  note: z.string().trim().nullable(),
});

export type PurchaseFormValues = z.infer<typeof purchaseFormSchema>;
