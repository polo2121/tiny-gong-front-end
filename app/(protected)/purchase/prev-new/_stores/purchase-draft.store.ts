import {
  getImagesGroupByAttributes,
  getSubcategoriesByCategory,
  getSubcategoryDetails,
} from "@/lib/categories/helpers";
import { createStore } from "zustand";
import { immer } from "zustand/middleware/immer";

import {
  type ProductImage,
  ProductDraft,
  VariantDraft,
  type PurchaseDraft,
} from "../schema/new-purchase-schema";

export type PurchaseDraftStore = {
  draft: PurchaseDraft;
  updateProductName: (productId: string, value: string) => void;
  updateCategory: (productId: string, value: string) => void;
  updateSubcategory: (productId: string, value: string) => void;

  addProducts: () => void;
  addVariants: (productId: string) => void;
  addImage: (
    productId: string,
    group: Record<string, string>,
    image: ProductImage,
  ) => void;
  cloneVariant: (productId: string, variantId: string) => void;
  removeVariant: (productId: string, variantId: string) => void;
  updateVariantField: (
    productId: string,
    variantId: string,
    field: "qty" | "unitPrice",
    value: number,
  ) => void;
  updateVariantAttribute: (
    productId: string,
    variantId: string,
    attribute: string,
    value: string,
  ) => void;
};

export function createPurchaseDraftStore(initialDraft: PurchaseDraft) {
  return createStore<PurchaseDraftStore>()(
    immer((set) => ({
      draft: initialDraft,

      addImage: (productId, group, image) => {
        set((state) => {
        
        });
      },

      cloneVariant: (productId, variantId) => {
        set((state) => {
          const product = state.draft.products.find((p) => p.id === productId);
          if (!product) return;

          const index = product.variants.findIndex(
            (variant: { id: string }) => variant.id === variantId,
          );
          if (index === -1) return;

          const variant = product.variants[index];
          product.variants.splice(index + 1, 0, {
            ...variant,
            id: crypto.randomUUID(),
            attributes: { ...variant.attributes },
          });
        });
      },

      removeVariant: (productId, variantId) => {
        set((state) => {
          const product = state.draft.products.find((p) => p.id === productId);
          if (!product) return;

          const index = product.variants.findIndex(
            (variant: { id: string }) => variant.id === variantId,
          );
          if (index === -1) return;

          product.variants.splice(index, 1);
        });
      },

      addProducts: () => {
        set((state) => {
          state.draft.products.push(createEmptyProduct());
        });
      },

      updateVariantField: (productId, variantId, field, value) => {
        set((state) => {
          const product = state.draft.products.find((p) => p.id === productId);
          if (!product) return;

          const variant = product.variants.find(
            (item: { id: string }) => item.id === variantId,
          );
          if (!variant) return;

          variant[field] = value;
        });
      },

      updateVariantAttribute: (productId, variantId, attribute, value) => {
        set((state) => {
          const product = state.draft.products.find((p) => p.id === productId);
          if (!product) return;

          const variant = product.variants.find(
            (item: { id: string }) => item.id === variantId,
          );
          if (!variant) return;

          variant.attributes[attribute] = value;
        });
      },

      addVariants: (productId) => {
        set((state) => {
          const product = state.draft.products.find((p) => p.id === productId);
          if (!product) return;

          const variant = product.subcategory
            ? createEmptyVariant(product.subcategory)
            : null;
          if (!variant) return;

          product.variants.push(variant);
        });
      },

      updateProductName: (productId, value) => {
        set((state) => {
          const product = state.draft.products.find((p) => p.id === productId);
          if (!product) return;

          product.name = value;
        });
      },

      updateCategory: (productId, value) => {
        set((state) => {
          const product = state.draft.products.find(
            (product) => product.id === productId,
          );

          if (!product || product.category === value) return;

          const subcategory = getSubcategoriesByCategory(value)[0];
          const variant = subcategory
            ? createEmptyVariant(subcategory.id)
            : null;

          product.category = value;
          product.subcategory = subcategory?.id ?? "";
          product.variants = variant ? [variant] : [];
          product.imageGroups = [];
        });
      },

      updateSubcategory: (productId, value) => {
        set((state) => {
          const product = state.draft.products.find(
            (product) => product.id === productId,
          );

          if (!product || product.subcategory === value) return;
          const variant = createEmptyVariant(value);
          product.subcategory = value;
          product.variants = variant ? [variant] : [];
          product.imageGroups = [];
        });
      },
    })),
  );
}

export function createEmptyProduct(): ProductDraft {
  const variant = createEmptyVariant("t-shirts");
  const imageGroupingAttributes = getImagesGroupByAttributes("t-shirts") ?? [];
 
  return {
    id: crypto.randomUUID(),
    name: "",
    category: "clothing",
    subcategory: "t-shirts",

    variants: variant ? [variant] : [],
    imageGroupingAttributes: [...imageGroupingAttributes],
    imageGroups: [],
  };
}

export function createEmptyVariant(subcategoryId: string): VariantDraft | null {
  const subcategory = getSubcategoryDetails(subcategoryId);
  if (!subcategory) return null;

  return {
    id: crypto.randomUUID(),
    attributes: Object.fromEntries(
      subcategory.variantAttributes.map((attribute) => [attribute, ""]),
    ),
    qty: 0,
    unitPrice: 0,
  };
}
