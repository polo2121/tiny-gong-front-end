import { z } from "zod";

import {
  categories,
  getSubcategory,
  subcategories,
  type CategoryId,
  type SubcategoryId,
  type VariantAttribute,
} from "../_taxonomy/product-taxonomy";

const categoryIds = categories.map((category) => category.id);
const subcategoryIds = subcategories.map((subcategory) => subcategory.id);

export const categoryIdSchema = z.custom<CategoryId>(
  (value) => categoryIds.includes(value as CategoryId),
  { message: "Invalid category" },
);

export const subcategoryIdSchema = z.custom<SubcategoryId>(
  (value) => subcategoryIds.includes(value as SubcategoryId),
  { message: "Invalid subcategory" },
);

const fileSchema = z.custom<File>(
  (value) => typeof File !== "undefined" && value instanceof File,
  { message: "Invalid image file" },
);

export const variantDraftSchema = z.object({
  id: z.string().min(1),
  attributes: z.record(z.string(), z.string()),
  qty: z.number(),
  unitPrice: z.number(),
});

export type VariantDraft = z.infer<typeof variantDraftSchema>;

export const imageAssignmentDraftSchema = z.object({
  groupKey: z.string().min(1),
  file: fileSchema,
});

export type ImageAssignmentDraft = z.infer<typeof imageAssignmentDraftSchema>;

export const productDraftSchema = z
  .object({
    id: z.string().min(1),
    name: z.string(),
    category: categoryIdSchema,
    subcategory: subcategoryIdSchema,
    variants: z.array(variantDraftSchema).min(1),
    imageAssignments: z.array(imageAssignmentDraftSchema),
  })
  .superRefine((product, ctx) => {
    const subcategory = getSubcategory(product.subcategory);

    if (!subcategory) return;

    if (subcategory.categoryId !== product.category) {
      ctx.addIssue({
        code: "custom",
        path: ["subcategory"],
        message: "Subcategory does not belong to category",
      });
      return;
    }

    product.variants.forEach((variant, variantIndex) => {
      for (const attribute of Object.keys(variant.attributes)) {
        if (!subcategory.variantAttributes.includes(attribute as VariantAttribute)) {
          ctx.addIssue({
            code: "custom",
            path: ["variants", variantIndex, "attributes", attribute],
            message: `${attribute} is not valid for this subcategory`,
          });
        }
      }
    });
  });

export type ProductDraft = z.infer<typeof productDraftSchema>;

export const purchaseDraftSchema = z.object({
  purchaseId: z.string().nullable(),
  purchaseDate: z.string(),
  supplierId: z.string(),
  products: z.array(productDraftSchema).min(1),
});

export type PurchaseDraft = z.infer<typeof purchaseDraftSchema>;
