"use client";

import { SearchIcon } from "@/components/icons/SearchIcon";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/currency";

import { sampleProducts, type ProductSearchResult } from "../_data";
import { useSaleDraftStore } from "../_stores/use-sale-draft-store";
import { CategoryBadge } from "./category-badge";
import { useState } from "react";

function searchProducts(query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  // Backend trace: replace this temporary filter with an API call or server action
  // when product search is available.
  if (!normalizedQuery) {
    return sampleProducts.slice(0, 3);
  }

  return sampleProducts.filter((product) =>
    [
      product.name,
      product.sku,
      product.barcode,
      product.category,
      ...(product.variants?.map((variant) => variant.label) ?? []),
    ].some((value) => value.toLowerCase().includes(normalizedQuery)),
  );
}

export function SaleItemSearch() {
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const addItem = useSaleDraftStore((state) => state.addItem);

  const productResults = searchProducts(productSearchQuery);

  function handleAddItem(selectedProduct: ProductSearchResult) {
    if (!selectedProduct) {
      return;
    }
    addItem({
      name: selectedProduct.name,
      sku: selectedProduct.sku,
      category: selectedProduct.category,
      variant: selectedProduct.variants?.[0],
      qty: 1,
      price: selectedProduct.price,
      discount: 0,
    });
    setProductSearchQuery("");
    setIsSearchOpen(false);
  }

  return (
    <Field className="relative w-full">
      <div className="relative ">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-teal-600" />
        <Input
          type="search"
          placeholder="Find product by name or SKU"
          autoComplete="off"
          onChange={(event) => {
            setProductSearchQuery(event.currentTarget.value);
            // setSelectedProduct(null);
            setIsSearchOpen(true);
          }}
          onFocus={() => setIsSearchOpen(true)}
          onBlur={() => setIsSearchOpen(false)}
          className="pl-12"
          required
        />

        {isSearchOpen && (
          <div className="absolute top-14 left-0 right-0 z-40 rounded-2xl border border-hightlight/15 bg-white shadow-card text-foreground overflow-hidden">
            {productResults.length > 0 ? (
              <ul className="scrollbar-soft max-h-68 overflow-y-auto p-2 pr-1">
                {productResults.map((product) => (
                  <li
                    key={product.id}
                    className="border-b border-dashed border-gray-200 p-4 hover:bg-highlight/10 rounded-xl transition ease-in-out duration-500 cursor-pointer "
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4  text-left text-sm  "
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleAddItem(product)}
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
                        <span className="block font-chewy text-highlight-soft text-base">
                          {formatCurrency(product.price)}
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
    </Field>
  );
}
