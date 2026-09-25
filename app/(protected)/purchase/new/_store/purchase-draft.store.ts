import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type {
  ImageAssignmentDraft,
  PurchaseDraft,
} from "../_schema/purchase-draft.schema";

import {
  createEmptyProduct,
  createEmptyVariant,
  createInitialPurchaseDraft,
} from "../_factory/purchase-draft.factory";

import type {
  CategoryId,
  SubcategoryId,
  VariantAttribute,
} from "../_taxonomy/product-taxonomy";

import {
  getSubcategoriesByCategory,
  getVariantAttributes,
  getSubcategory,
} from "../_taxonomy/product-taxonomy";

type PurchaseDraftStore = {
  draft: PurchaseDraft;

  // Purchase
  setPurchaseDate: (purchaseDate: string) => void;
  setSupplier: (supplierId: string) => void;

  // Products
  addProduct: () => void;
  removeProduct: (productId: string) => void;

  updateProductName: (productId: string, name: string) => void;

  updateCategory: (productId: string, categoryId: CategoryId) => void;

  updateSubcategory: (productId: string, subcategoryId: SubcategoryId) => void;

  // Variants
  addVariant: (productId: string) => void;

  removeVariant: (productId: string, variantId: string) => void;

  duplicateVariant: (productId: string, variantId: string) => void;

  updateVariantAttribute: (
    productId: string,
    variantId: string,
    attribute: VariantAttribute,
    value: string,
  ) => void;

  updateVariantQty: (productId: string, variantId: string, qty: number) => void;

  updateVariantUnitPrice: (
    productId: string,
    variantId: string,
    unitPrice: number,
  ) => void;

  // Images
  setImageAssignment: (productId: string, groupKey: string, file: File) => void;

  removeImageAssignment: (productId: string, groupKey: string) => void;

  // Draft
  replaceDraft: (draft: PurchaseDraft) => void;
  resetDraft: () => void;
};

export const usePurchaseDraftStore = create<PurchaseDraftStore>()(
  immer((set) => ({
    draft: createInitialPurchaseDraft(),

    // --------------------------------
    // Purchase
    // --------------------------------

    setPurchaseDate: (purchaseDate) =>
      set((state) => {
        state.draft.purchaseDate = purchaseDate;
      }),

    setSupplier: (supplierId) =>
      set((state) => {
        state.draft.supplierId = supplierId;
      }),

    // --------------------------------
    // Products
    // --------------------------------

    addProduct: () =>
      set((state) => {
        state.draft.products.push(createEmptyProduct());
      }),

    removeProduct: (productId) =>
      set((state) => {
        // Always keep at least one product.
        if (state.draft.products.length <= 1) {
          return;
        }

        state.draft.products = state.draft.products.filter(
          (product) => product.id !== productId,
        );
      }),

    updateProductName: (productId, name) =>
      set((state) => {
        const product = state.draft.products.find(
          (product) => product.id === productId,
        );

        if (!product) return;

        product.name = name;
      }),

    updateCategory: (productId, categoryId) =>
      set((state) => {
        const product = state.draft.products.find(
          (product) => product.id === productId,
        );

        if (!product) return;

        const subcategories = getSubcategoriesByCategory(categoryId);

        const firstSubcategory = subcategories[0];

        if (!firstSubcategory) return;

        product.category = categoryId;
        product.subcategory = firstSubcategory.id;

        // Category changes the taxonomy rules.
        // Reset dependent data.
        product.variants = [createEmptyVariant(firstSubcategory.id)];

        product.imageAssignments = [];
      }),

    updateSubcategory: (productId, subcategoryId) =>
      set((state) => {
        const product = state.draft.products.find(
          (product) => product.id === productId,
        );

        if (!product) return;

        const subcategory = getSubcategory(subcategoryId);

        if (!subcategory) return;

        // Protect against invalid
        // category/subcategory combinations.
        if (subcategory.categoryId !== product.category) {
          return;
        }

        product.subcategory = subcategoryId;

        // Variant structure may now be different.
        product.variants = [createEmptyVariant(subcategoryId)];

        // Existing image groups may no longer
        // belong to the new subcategory.
        product.imageAssignments = [];
      }),

    // --------------------------------
    // Variants
    // --------------------------------

    addVariant: (productId) =>
      set((state) => {
        const product = state.draft.products.find(
          (product) => product.id === productId,
        );

        if (!product) return;

        product.variants.push(createEmptyVariant(product.subcategory));
      }),

    removeVariant: (productId, variantId) =>
      set((state) => {
        const product = state.draft.products.find(
          (product) => product.id === productId,
        );

        if (!product) return;

        // Always keep at least one variant.
        if (product.variants.length <= 1) {
          return;
        }

        product.variants = product.variants.filter(
          (variant) => variant.id !== variantId,
        );

        // Do NOT modify imageAssignments here.
        //
        // A removed variant may make an image
        // assignment stale. Current image groups
        // are derived by the UI and stale
        // assignments are filtered during submit.
      }),

    duplicateVariant: (productId, variantId) =>
      set((state) => {
        const product = state.draft.products.find(
          (product) => product.id === productId,
        );

        if (!product) return;

        const variantIndex = product.variants.findIndex(
          (variant) => variant.id === variantId,
        );

        if (variantIndex === -1) return;

        const variant = product.variants[variantIndex];

        const duplicate = {
          ...variant,

          id: crypto.randomUUID(),

          // Make a new attributes object.
          attributes: {
            ...variant.attributes,
          },
        };

        // Put the duplicate directly
        // after the original row.
        product.variants.splice(variantIndex + 1, 0, duplicate);
      }),

    updateVariantAttribute: (productId, variantId, attribute, value) =>
      set((state) => {
        const product = state.draft.products.find(
          (product) => product.id === productId,
        );

        if (!product) return;

        const variant = product.variants.find(
          (variant) => variant.id === variantId,
        );

        if (!variant) return;

        const allowedAttributes = getVariantAttributes(product.subcategory);

        // Do not allow attributes that don't
        // belong to this subcategory.
        if (!allowedAttributes.includes(attribute)) {
          return;
        }

        variant.attributes[attribute] = value;

        // Do NOT synchronize imageAssignments.
        //
        // Changing an attribute may change the
        // derived image group. Old assignments
        // are allowed to temporarily remain stale.
      }),

    updateVariantQty: (productId, variantId, qty) =>
      set((state) => {
        const product = state.draft.products.find(
          (product) => product.id === productId,
        );

        if (!product) return;

        const variant = product.variants.find(
          (variant) => variant.id === variantId,
        );

        if (!variant) return;

        variant.qty = qty;
      }),

    updateVariantUnitPrice: (productId, variantId, unitPrice) =>
      set((state) => {
        const product = state.draft.products.find(
          (product) => product.id === productId,
        );

        if (!product) return;

        const variant = product.variants.find(
          (variant) => variant.id === variantId,
        );

        if (!variant) return;

        variant.unitPrice = unitPrice;
      }),

    // --------------------------------
    // Images
    // --------------------------------

    setImageAssignment: (productId, groupKey, file) =>
      set((state) => {
        const product = state.draft.products.find(
          (product) => product.id === productId,
        );

        if (!product) return;

        const assignment = product.imageAssignments.find(
          (assignment) => assignment.groupKey === groupKey,
        );

        if (assignment) {
          assignment.file = file;
          return;
        }

        const newAssignment: ImageAssignmentDraft = {
          groupKey,
          file,
        };

        product.imageAssignments.push(newAssignment);
      }),

    removeImageAssignment: (productId, groupKey) =>
      set((state) => {
        const product = state.draft.products.find(
          (product) => product.id === productId,
        );

        if (!product) return;

        product.imageAssignments = product.imageAssignments.filter(
          (assignment) => assignment.groupKey !== groupKey,
        );
      }),

    // --------------------------------
    // Draft
    // --------------------------------

    replaceDraft: (draft) =>
      set((state) => {
        state.draft = draft;
      }),

    resetDraft: () =>
      set((state) => {
        state.draft = createInitialPurchaseDraft();
      }),
  })),
);
