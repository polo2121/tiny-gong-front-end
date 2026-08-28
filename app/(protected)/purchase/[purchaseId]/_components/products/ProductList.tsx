"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PackageAddIcon } from "@hugeicons/core-free-icons";

import DualText from "@/components/DualText";
import { Button } from "@/components/ui/button";

import { ProductCard } from "./ProductCard";
import { ProductFormDrawer } from "./ProductFormDrawer";
import { NoProductsState } from "../states/NoProductsState";
import { useProductDraftStore } from "../../_stores/use-product-draft-store";
import type { Product } from "../../_schemas/purchase-product-schema";

export function ProductList() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);
  const products = useProductDraftStore((state) => state.products);
  const hasProduct = products.length > 0;

  function openCreateProductDrawer() {
    setSelectedProduct(null);
    setIsOpen(true);
  }

  function openEditProductDrawer(product: Product) {
    setSelectedProduct(product);
    setIsOpen(true);
  }

  return (
    <section className="flex flex-2 flex-col gap-4 rounded-2xl">
      <header className="flex items-start justify-between gap-4">
        <DualText label="Product List" subLabel="ကုန်ပစ္စည်းစာရင်း" />
      </header>

      {!hasProduct ? (
        <NoProductsState onCreate={openCreateProductDrawer} />
      ) : (
        <>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={openEditProductDrawer}
            />
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={openCreateProductDrawer}
          >
            <HugeiconsIcon
              icon={PackageAddIcon}
              color="currentColor"
              strokeWidth={2.2}
            />
            Add Product
          </Button>
        </>
      )}

      <ProductFormDrawer
        open={isOpen}
        onOpenChange={setIsOpen}
        product={selectedProduct}
      />
    </section>
  );
}
