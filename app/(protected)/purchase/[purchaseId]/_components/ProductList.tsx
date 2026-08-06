"use client";

import DualText from "@/components/DualText";

import { ProductCard } from "./ProductCard";
import { usePurchaseStore } from "../../_stores/use-purchase-store";

type ProductListProps = {
  purchaseId: string;
};

export function ProductList({ purchaseId }: ProductListProps) {
  const purchase = usePurchaseStore((state) =>
    state.purchases.find((purchaseItem) => purchaseItem.id === purchaseId),
  );

  if (!purchase) {
    return null;
  }

  return (
    <section className="flex flex-2 flex-col gap-4 rounded-2xl">
      <header className="flex items-start justify-between gap-4">
        <DualText label="Product List" subLabel="ကုန်ပစ္စည်းစာရင်း" />
      </header>

      {purchase.registeredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
