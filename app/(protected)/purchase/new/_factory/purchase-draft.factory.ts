import type {
  ProductDraft,
  PurchaseDraft,
  VariantDraft,
} from "../_schema/purchase-draft.schema";
import {
  getSubcategoriesByCategory,
  getSubcategory,
  type CategoryId,
  type SubcategoryId,
} from "../_taxonomy/product-taxonomy";

export function createEmptyVariant(subcategoryId: SubcategoryId): VariantDraft {
  const subcategory = getSubcategory(subcategoryId);

  if (!subcategory) {
    throw new Error(`Unknown subcategory: ${subcategoryId}`);
  }

  const attributes = Object.fromEntries(
    subcategory.variantAttributes.map((attribute) => [attribute, ""]),
  );

  return {
    id: crypto.randomUUID(),
    attributes,
    qty: 0,
    unitPrice: 0,
  };
}

export function createEmptyProduct(): ProductDraft {
  const category: CategoryId = "clothing";
  const subcategory = getSubcategoriesByCategory(category)[0];

  if (!subcategory) {
    throw new Error(`No subcategory found for category: ${category}`);
  }

  return {
    id: crypto.randomUUID(),
    name: "",
    category,
    subcategory: subcategory.id,
    variants: [createEmptyVariant(subcategory.id)],
    imageAssignments: [],
  };
}

export function createInitialPurchaseDraft(): PurchaseDraft {
  return {
    purchaseId: null,
    purchaseDate: "",
    supplierId: "",
    products: [createEmptyProduct()],
  };
}
