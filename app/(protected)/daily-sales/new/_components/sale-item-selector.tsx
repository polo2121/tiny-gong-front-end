"use client";

import * as React from "react";

import DualText from "@/components/DualText";
import { BarcodeScanIcon } from "@/components/icons/BarcodeScanIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { mockProducts, type ProductSearchResult } from "../_data";
import { CategoryBadge } from "./category-badge";
import { useState } from "react";

function searchProducts(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  // Backend trace: replace this mock filter with an API call or server action
  // when product search is available.
  if (!normalizedQuery) {
    return mockProducts.slice(0, 3);
  }

  return mockProducts.filter((product) =>
    [
      product.name,
      product.sku,
      product.barcode,
      product.category,
      ...(product.variants?.map((variant) => variant.label) ?? []),
    ].some((value) => value.toLowerCase().includes(normalizedQuery)),
  );
}

export function SaleItemSelector() {
  const [productQuery, setProductQuery] = useState("");
  const [selectedProduct, setSelectedProduct] =
    useState<ProductSearchResult | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const productResults = searchProducts(productQuery);

  function handleSelectProduct(product: ProductSearchResult) {
    setSelectedProduct(product);
    setProductQuery(`${product.name} (${product.sku})`);
    setIsSearchOpen(false);
  }

  return (
    <section className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <DualText label="Add Products" subLabel="ပစ္စည်းထည့်ရန်" />

        <Button variant="outline" size="lg" showIcon={false}>
          <BarcodeScanIcon className="size-6" data-icon="inline-start" />
          Scan Barcode
        </Button>
      </div>

      <form
        className="grid gap-3 lg:grid-cols-[minmax(220px,1fr)_130px_auto]"
        onSubmit={(event) => event.preventDefault()}
      >
        <Field name="product">
          <FieldLabel>Product</FieldLabel>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-teal-600" />
            <FieldControl
              type="search"
              placeholder="Find product by name or SKU"
              autoComplete="off"
              value={productQuery}
              onChange={(event) => {
                setProductQuery(event.currentTarget.value);
                setSelectedProduct(null);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => setIsSearchOpen(false)}
              className="pl-12"
              required
            />

            {isSearchOpen && (
              <div className="absolute top-14 left-0 right-0 z-40 rounded-2xl border border-hightlight/15 bg-white shadow-card text-foreground">
                {productResults.length > 0 ? (
                  <ul className="scrollbar-soft max-h-68 overflow-y-auto p-2 pr-1">
                    {productResults.map((product) => (
                      <li key={product.id}>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between gap-4 rounded-xl p-4 px-6 text-left text-sm transition ease-in-out cursor-pointer hover:bg-highlight/10"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => handleSelectProduct(product)}
                        >
                          <div className="min-w-0">
                            <div className="flex gap-2">
                              <span className="block truncate font-margarine text-base">
                                {product.name}
                              </span>
                              <CategoryBadge category={product.category} />
                            </div>

                            <span className="block truncate text-sm font-semibold text-highlight-soft">
                              {product.variants?.[0]?.label ?? product.barcode}
                            </span>
                            <span className="block truncate text-xs opacity-60">
                              {product.sku}
                            </span>
                          </div>
                          <span className="shrink-0 text-right">
                            <span className="block font-chewy text-highlight-soft text-lg">
                              {product.price}
                            </span>
                            <span className="block text-sm opacity-60 ">
                              {product.stock} left
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-5 text-sm font-semibold opacity-60">
                    No products found.
                  </div>
                )}
              </div>
            )}
          </div>
          <FieldError match="valueMissing">
            Choose a product before adding an item.
          </FieldError>
          {selectedProduct && (
            <p className="text-xs font-semibold text-highlight-soft">
              Selected: {selectedProduct.sku} / Stock {selectedProduct.stock}
            </p>
          )}
        </Field>

        <Field name="discount">
          <FieldLabel>Discount</FieldLabel>
          <FieldControl
            type="number"
            min="0"
            step="100"
            defaultValue="0"
            inputMode="numeric"
          />
          <FieldError match="rangeUnderflow">
            Discount cannot be negative.
          </FieldError>
        </Field>

        <div className="flex flex-col gap-2 items-center ">
          <span className="invisible">Action</span>
          <Button type="submit" className="w-full lg:w-auto" size="lg">
            Add Item
          </Button>
        </div>
      </form>
    </section>
  );
}
