"use client";

import { create } from "zustand";

import { formatCurrency } from "@/lib/currency";

import type { CartItem } from "../_data";
import type { Customer } from "../_components/customer/types";
import type { Payment } from "../_components/payment/types";

type SaleDraftStore = {
  items: CartItem[];
  customer: Customer | null;
  payment: Payment | null;
  note: string;

  setCustomer: (customer: Customer | null) => void;
  setPayment: (payment: Payment | null) => void;

  setItemQuantity: (sku: string, quantity: number) => void;
  setItemDiscount: (sku: string, discountAmount: number) => void;

  addItem: (item: CartItem) => void;
  removeItem: (sku: string) => void;
  resetDraft: () => void;
};

const initialCartItem: CartItem[] = [];

export const useSaleDraftStore = create<SaleDraftStore>((set) => ({
  items: initialCartItem,
  customer: null,
  payment: null,
  note: "",
  setCustomer: (customer) => set({ customer }),
  setPayment: (payment) => set({ payment }),

  addItem: (item) =>
    set((state) => ({
      items: addCartItem(state.items, item),
    })),

  setItemQuantity: (sku, quantity) =>
    set((state) => ({
      items: updateQuantity(state.items, sku, quantity, "set"),
    })),
  setItemDiscount: (sku, discountAmount) =>
    set((state) => ({
      items: setCartItemDiscount(state.items, sku, discountAmount),
    })),
  removeItem: (sku) =>
    set((state) => ({
      items: state.items.filter((item) => item.sku !== sku),
    })),
  resetDraft: () =>
    set({
      items: [],
      customer: null,
      payment: null,
      note: "",
    }),
}));

function addCartItem(items: CartItem[], nextItem: CartItem) {
  const existingItem = items.find((item) => item.sku === nextItem.sku);

  if (!existingItem) {
    return [...items, nextItem];
  }
  return updateQuantity(items, nextItem.sku, nextItem.qty, "add");
}

function updateQuantity(items: CartItem[], sku: string, quantity: number, type: "add" | "set") {
  return items.map((item) => {
    if (item.sku !== sku) return item;

    const qty = type === "add" ? item.qty + 1 : quantity;

    return {
      ...item,
      qty: Math.max(1, qty),
    };
  });
}

function setCartItemDiscount(
  items: CartItem[],
  sku: string,
  discountAmount: number,
) {
  return items.map((item) => {
    if (item.sku !== sku) {
      return item;
    }

    const maxDiscount = item.price * item.qty;
    const discount = Math.min(Math.max(0, discountAmount), maxDiscount);

    return {
      ...item,
      discount,
    };
  });
}

export function getSaleTotals(items: CartItem[]) {
  const totalQty = items.reduce((total, item) => total + item.qty, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );
  const discount = items.reduce((total, item) => total + item.discount, 0);
  const grandTotal = subtotal - discount;

  return {
    totalQty: String(totalQty),
    subtotal: formatCurrency(subtotal),
    discount: formatCurrency(discount),
    taxFees: "0",
    grandTotal: formatCurrency(grandTotal),
  };
}
