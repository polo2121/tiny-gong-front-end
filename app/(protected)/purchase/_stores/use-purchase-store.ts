"use client";

import { create } from "zustand";

import type { PurchaseRecord } from "../_types/purchase";
export type { PurchaseRecord, RegisteredProduct } from "../_types/purchase";

type PurchaseStore = {
  purchases: PurchaseRecord[];
  addPurchase: (purchase: PurchaseRecord) => void;
  removePurchase: (purchaseId: string) => void;
};

const initialPurchases: PurchaseRecord[] = [];

export const usePurchaseStore = create<PurchaseStore>((set) => ({
  purchases: initialPurchases,
  addPurchase: (purchase: PurchaseRecord) =>
    set((state) => ({
      purchases: [purchase, ...state.purchases],
    })),
  removePurchase: (purchaseId) =>
    set((state) => ({
      purchases: state.purchases.filter(
        (purchase) => purchase.id !== purchaseId,
      ),
    })),
}));
