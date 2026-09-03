"use client";

import { useState } from "react";

import { ProductList } from "./products/ProductList";
import { PurchaseDraftSummary } from "./purchase/PurchaseDraftSummary";

function createEmptyProduct(id: string): any {
  return {
    id,
    name: "",
    categoryId: "",
    subcategoryId: "",
    variants: [
      {
        id: `${id}-variant-1`,
        attributes: {
          color: "Pink",
          size: "S",
          design: "Bear",
        },
        qty: 2,
        unitPrice: 12500,
      },
      {
        id: `${id}-variant-2`,
        attributes: {
          color: "Blue",
          size: "M",
          design: "Star",
        },
        qty: 3,
        unitPrice: 13500,
      },
      {
        id: `${id}-variant-3`,
        attributes: {
          color: "Yellow",
          size: "L",
          design: "Smile",
        },
        qty: 1,
        unitPrice: 15000,
      },
    ],
  };
}

export function NewPurchaseView() {
  const [products, setProducts] = useState<any[]>([
    createEmptyProduct("product-1"),
  ]);

  function addProduct() {
    setProducts((currentProducts: any[]) => [
      ...currentProducts,
      createEmptyProduct(crypto.randomUUID()),
    ]);
  }

  function updateProduct(updatedProduct: any) {
    setProducts((currentProducts: any[]) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
  }

  function removeProduct(productId: string) {
    setProducts((currentProducts: any[]) =>
      currentProducts.filter((product) => product.id !== productId),
    );
  }

  return (
    <section className="w-full xl:bg-card-surface">
      <div className="grid md:grid-cols-[minmax(0,860px)_360px] xl:mx-auto xl:max-w-6xl gap-6 ">
        <ProductList
          products={products}
          onAddProduct={addProduct}
          onUpdateProduct={updateProduct}
          onRemoveProduct={removeProduct}
        />

        <PurchaseDraftSummary products={products} />
      </div>
    </section>
  );
}
