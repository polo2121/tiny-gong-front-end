import { z } from "zod";

import { purchaseRecordSchema } from "../../_schemas/purchase-schema";
import { productSchema } from "./purchase-product-schema";

export const purchaseDetailsSchema = purchaseRecordSchema.extend({
  products: z.array(productSchema),
});

export const purchaseDetailsApiResponseSchema = z.object({
  purchaseDetails: purchaseDetailsSchema,
});

export type PurchaseDetails = z.infer<typeof purchaseDetailsSchema>;

export type PurchaseDetailApiResponse = z.infer<
  typeof purchaseDetailsApiResponseSchema
>;
