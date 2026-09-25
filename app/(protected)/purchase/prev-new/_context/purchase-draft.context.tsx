"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import type { PurchaseDraft } from "@/lib/purchase-draft/new-purchase-schema";

import {
  createPurchaseDraftStore,
  type PurchaseDraftStore,
} from "@/lib/purchase-draft/purchase-draft.store";

import { useStore, type StoreApi } from "zustand";

const PurchaseDraftContext = createContext<StoreApi<PurchaseDraftStore> | null>(
  null,
);

type PurchaseDraftProviderProps = {
  initialDraft: PurchaseDraft;
  children: ReactNode;
};

export function PurchaseDraftProvider({
  initialDraft,
  children,
}: PurchaseDraftProviderProps) {
  const storeRef = useRef<StoreApi<PurchaseDraftStore> | null>(null);
  if (!storeRef.current) {
    storeRef.current = createPurchaseDraftStore(initialDraft);
  }

  return (
    <PurchaseDraftContext.Provider value={storeRef.current}>
      {children}
    </PurchaseDraftContext.Provider>
  );
}

export function usePurchaseDraft<T>(
  selector: (state: PurchaseDraftStore) => T,
) {
  const store = useContext(PurchaseDraftContext);

  if (!store) {
    throw new Error(
      "usePurchaseDraft must be used inside PurchaseDraftProvider",
    );
  }

  return useStore(store, selector);
}
