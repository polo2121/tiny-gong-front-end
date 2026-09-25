import { purchaseDraftSchema } from "../_schema/purchase-draft.schema";
import { getSubcategory } from "../_taxonomy/product-taxonomy";

export const purchaseSubmitSchema = purchaseDraftSchema.superRefine((draft, ctx) => {
  if (!draft.purchaseDate.trim()) {
    ctx.addIssue({
      code: "custom",
      path: ["purchaseDate"],
      message: "Purchase date is required",
    });
  }

  if (!draft.supplierId.trim()) {
    ctx.addIssue({
      code: "custom",
      path: ["supplierId"],
      message: "Supplier is required",
    });
  }

  draft.products.forEach((product, productIndex) => {
    if (!product.name.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["products", productIndex, "name"],
        message: "Product name is required",
      });
    }

    const subcategory = getSubcategory(product.subcategory);
    if (!subcategory) return;

    product.variants.forEach((variant, variantIndex) => {
      for (const attribute of subcategory.variantAttributes) {
        const value = variant.attributes[attribute];

        if (!value?.trim()) {
          ctx.addIssue({
            code: "custom",
            path: [
              "products",
              productIndex,
              "variants",
              variantIndex,
              "attributes",
              attribute,
            ],
            message: `${attribute} is required`,
          });
        }
      }

      if (variant.qty <= 0) {
        ctx.addIssue({
          code: "custom",
          path: ["products", productIndex, "variants", variantIndex, "qty"],
          message: "Quantity must be greater than 0",
        });
      }

      if (variant.unitPrice < 0) {
        ctx.addIssue({
          code: "custom",
          path: ["products", productIndex, "variants", variantIndex, "unitPrice"],
          message: "Unit price cannot be negative",
        });
      }
    });
  });
});
