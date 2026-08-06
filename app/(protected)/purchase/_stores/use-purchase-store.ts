"use client";

import { create } from "zustand";

export type RegisteredProduct = {
  id: string;
  name: string;
  expectedVariants: number;
  registeredVariantIds: string[];
};

export type PurchaseRecord = {
  id: string;
  supplier: string;
  expectedProducts: number;
  registeredProducts: RegisteredProduct[];
  date: string;
  amount: string;
  note?: string;
};

type PurchaseStore = {
  purchases: PurchaseRecord[];
  addPurchase: (purchase: PurchaseRecord) => void;
  removePurchase: (purchaseId: string) => void;
};

const initialPurchases: PurchaseRecord[] = [
  {
    id: "PO-1001",
    supplier: "Happy Kids Wholesale",
    expectedProducts: 5,
    registeredProducts: [
      {
        id: "PROD-1",
        name: "Cotton T-Shirt",
        expectedVariants: 5,
        registeredVariantIds: ["VAR-1", "VAR-2"],
      },
      {
        id: "PROD-2",
        name: "Story Book Set",
        expectedVariants: 3,
        registeredVariantIds: ["VAR-3"],
      },
    ],
    date: "Aug 03, 2026",
    amount: "420,000 MMK",
  },
  {
    id: "PO-1002",
    supplier: "Little Readers Supply",
    expectedProducts: 10,
    registeredProducts: [
      {
        id: "PROD-3",
        name: "Picture Dictionary",
        expectedVariants: 2,
        registeredVariantIds: ["VAR-4", "VAR-5"],
      },
      {
        id: "PROD-4",
        name: "Coloring Book",
        expectedVariants: 4,
        registeredVariantIds: ["VAR-6"],
      },
    ],
    date: "Aug 01, 2026",
    amount: "285,000 MMK",
  },
  {
    id: "PO-1003",
    supplier: "Toy Garden",
    expectedProducts: 7,
    registeredProducts: [
      {
        id: "PROD-5",
        name: "Wooden Puzzle",
        expectedVariants: 2,
        registeredVariantIds: [],
      },
      {
        id: "PROD-6",
        name: "Soft Blocks",
        expectedVariants: 3,
        registeredVariantIds: ["VAR-7", "VAR-8", "VAR-9"],
      },
    ],
    date: "Jul 29, 2026",
    amount: "198,000 MMK",
  },
  {
    id: "PO-1004",
    supplier: "Tiny Threads Co.",
    expectedProducts: 4,
    registeredProducts: [
      {
        id: "PROD-7",
        name: "Kids Hoodie",
        expectedVariants: 4,
        registeredVariantIds: ["VAR-10", "VAR-11"],
      },
      {
        id: "PROD-8",
        name: "Baby Pants",
        expectedVariants: 2,
        registeredVariantIds: ["VAR-12"],
      },
    ],
    date: "Jul 25, 2026",
    amount: "512,000 MMK",
  },
];

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
