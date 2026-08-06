"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type {
  PurchaseRecord,
  RegisteredProduct,
} from "./use-purchase-store";

type PurchaseProductDraft = {
  purchaseId: string;
  products: RegisteredProduct[];
};

type PurchaseProductDraftStore = {
  draftsByPurchaseId: Record<string, PurchaseProductDraft>;
  initializeDraft: (purchase: PurchaseRecord) => void;
  addProduct: (purchaseId: string, product: RegisteredProduct) => void;
};

export const usePurchaseProductDraftStore = create<PurchaseProductDraftStore>()(
  immer((set) => ({
    draftsByPurchaseId: {},

    initializeDraft: (purchase) =>
      set((state) => {
        if (state.draftsByPurchaseId[purchase.id]) {
          return;
        }

        state.draftsByPurchaseId[purchase.id] = {
          purchaseId: purchase.id,
          products: purchase.registeredProducts,
        };
      }),

    addProduct: (purchaseId, product) =>
      set((state) => {
        const draft = state.draftsByPurchaseId[purchaseId];

        if (!draft) {
          return;
        }

        draft.products.push(product);
      }),
  })),
);
