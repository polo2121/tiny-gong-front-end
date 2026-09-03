"use client";

import { Button } from "@/components/ui/button";

import { ProductCard } from "./ProductCard";

export function ProductList({
  products,
  onAddProduct,
  onUpdateProduct,
  onRemoveProduct,
}: any) {
  return (
    <section className="flex flex-col gap-4 flex-2">
      <div className="flex justify-end">
        <Button type="button" showIcon={false} onClick={onAddProduct}>
          Add Product
        </Button>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
            onChange={onUpdateProduct}
            onRemove={() => onRemoveProduct(product.id)}
          />
        ))}
      </div>
    </section>
  );
}
