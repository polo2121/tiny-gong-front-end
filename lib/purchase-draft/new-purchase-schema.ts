import { z } from "zod";

import { getSubcategoryDetails } from "@/lib/categories/helpers";

// -----------------------------------------------------------------------------
// Shared
// -----------------------------------------------------------------------------

export const productImageSchema = z.object({
  id: z.string().min(1),
  url: z.string().min(1),
  fileName: z.string().min(1),
});

export const imageGroupSchema = z.object({
  group: z.record(z.string(), z.string()),
  variantIds: z.array(z.string().min(1)),
  image: productImageSchema.nullable(),
});

// -----------------------------------------------------------------------------
// Draft
// -----------------------------------------------------------------------------

export const variantDraftSchema = z.object({
  id: z.string().min(1),
  attributes: z.record(z.string(), z.string()),
  qty: z.number().int().nonnegative(),
  unitPrice: z.number().nonnegative(),
});

export const productDraftSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  category: z.string(),
  subcategory: z.string(),

  variants: z.array(variantDraftSchema),  
  imageGroupingAttributes: z.array(z.string()),
  imageGroups: z.array(imageGroupSchema),
});

export const purchaseDraftSchema = z.object({
  purchaseId: z.string().nullable(),
  purchaseDate: z.string(),
  supplierId: z.string(),
  products: z.array(productDraftSchema),
});

// -----------------------------------------------------------------------------
// Final validation
// -----------------------------------------------------------------------------

export function createXVariantSchema(subcategoryId: string) {
  const subcategory = getSubcategoryDetails(subcategoryId);

  if (!subcategory) {
    throw new Error(`Invalid subcategory: ${subcategoryId}`);
  }

  const attributes = Object.fromEntries(
    subcategory.variantAttributes.map((attribute : string) => [
      attribute,
      z.string().trim().min(1, `${attribute} is required`),
    ]),
  );

  return variantDraftSchema.extend({
    attributes: z.object(attributes).strict(),
  });
}

export function createXProductSchema(subcategoryId: string) {
  return productDraftSchema.extend({
    subcategory: z.literal(subcategoryId),
    variants: z.array(createXVariantSchema(subcategoryId)).min(1),
  });
}

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type ProductImage = z.infer<typeof productImageSchema>;
export type ImageGroup = z.infer<typeof imageGroupSchema>;

export type VariantDraft = z.infer<typeof variantDraftSchema>;
export type ProductDraft = z.infer<typeof productDraftSchema>;
export type PurchaseDraft = z.infer<typeof purchaseDraftSchema>;