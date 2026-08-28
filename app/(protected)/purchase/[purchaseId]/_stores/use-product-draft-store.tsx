"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";
import { createStore, type StoreApi } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";

import type {
  ProductFormValues,
  Product,
  VariantFormValues,
} from "../_schemas/purchase-product-schema.ts";

type ProductDraftProviderProps = {
  purchaseId: string;
  products: Product[];
  children: ReactNode;
};

const ProductDraftContext = createContext<StoreApi<ProductDraftStore> | null>(
  null,
);
type ProductDraftStore = {
  purchaseId: string;
  products: Product[];
  initializeDraft: (purchaseId: string, products: Product[]) => void;
  createProduct: (product: ProductFormValues) => void;
  editProduct: (productId: string, product: ProductFormValues) => void;

  createVariant: (productId: string, variant: VariantFormValues) => void;
  editVariant: (
    productId: string,
    variantId: string,
    variant: VariantFormValues,
  ) => void;
};

function createProductDraftStore({
  purchaseId,
  products,
}: {
  purchaseId: string;
  products: Product[];
}) {
  return createStore<ProductDraftStore>()(
    immer((set) => ({
      purchaseId,
      products: products,

      initializeDraft: (purchaseId, products = []) =>
        set((state) => {
          state.purchaseId = purchaseId;
          state.products = products;
        }),

      createProduct: (product) =>
        set((state) => {
          const alreadyExists = state.products.some(
            (currentProduct) =>
              currentProduct.name.toLowerCase() ===
                product.name.toLowerCase() &&
              currentProduct.category === product.category,
          );

          if (alreadyExists) {
            return;
          }

          state.products.push({
            ...product,
            id: crypto.randomUUID(),
            seriesCode: "Pending",
            variants: [],
          });
        }),

      editProduct: (productId, product) =>
        set((state) => {
          const duplicate = state.products.find(
            (p) =>
              p.id !== productId &&
              p.name.toLowerCase() === product.name.toLowerCase() &&
              p.category === product.category,
          );
          if (duplicate) return;
          const target = state.products.find((p) => p.id === productId);
          if (!target) return;

          target.name = product.name;
          target.category = product.category;
          target.sellPrice = product.sellPrice;
          target.purchasePrice = product.purchasePrice;
          target.expectedVariants = product.expectedVariants;
        }),

      createVariant: (productId, variant) =>
        set((state) => {
          const product = state.products.find((p) => p.id === productId);
          if (!product) return;

          const duplicate = product.variants.find(
            (v) =>
              v.name.toLowerCase() === variant.name.toLowerCase() &&
              v.size.toLowerCase() === variant.size.toLowerCase() &&
              v.color.toLowerCase() === variant.color.toLowerCase(),
          );
          if (duplicate) return;

          product.variants.push({
            ...variant,
            id: crypto.randomUUID(),
          });
        }),

      editVariant: (productId, variantId, variant) =>
        set((state) => {
          const product = state.products.find((p) => p.id === productId);
          if (!product) return;

          const duplicate = product.variants.find(
            (v) =>
              v.id !== variantId &&
              v.name.toLowerCase() === variant.name.toLowerCase() &&
              v.size.toLowerCase() === variant.size.toLowerCase() &&
              v.color.toLowerCase() === variant.color.toLowerCase(),
          );
          if (duplicate) return;

          const target = product.variants.find((v) => v.id === variantId);
          if (!target) return;

          Object.assign(target, variant);
        }),
    })),
  );
}

export function ProductDraftProvider({
  purchaseId,
  products,
  children,
}: ProductDraftProviderProps) {
  const storeRef = useRef<StoreApi<ProductDraftStore> | null>(null);

  if (!storeRef.current) {
    storeRef.current = createProductDraftStore({
      purchaseId,
      products,
    });
  }

  return (
    <ProductDraftContext.Provider value={storeRef.current}>
      {children}
    </ProductDraftContext.Provider>
  );
}

export function useProductDraftStore<T>(
  selector: (state: ProductDraftStore) => T,
) {
  const store = useContext(ProductDraftContext);

  if (!store) {
    throw new Error(
      "useProductDraftStore must be used inside ProductDraftProvider.",
    );
  }

  return useStore(store, selector);
}
