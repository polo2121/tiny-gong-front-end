"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { ProductCard } from "./ProductCard";
import { usePurchaseDraft } from "../../_context/purchase-draft.context";
import { EmptyState } from "@/components/EmptyState";
import { Identity } from "./Identity";
import { Images } from "./Images";
import { Variants } from "./Variants";
import { Summary } from "./Summary";
import { useFadeVisibility } from "@/hooks/use-fade-visibility";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductDraft } from "@/lib/purchase-draft/new-purchase-schema";

export function ProductList() {
  const [openItems, setItemsOpen] = useState<string[]>(["product-0"]);

  const { purchaseId } = usePurchaseDraft((state) => state.draft);
  const { products } = usePurchaseDraft((state) => state.draft);

  return (
    <section className="flex min-w-0 flex-col gap-4">
      <Accordion
        multiple
        value={openItems}
        onValueChange={setItemsOpen}
        className="flex flex-col gap-3"
      >
        {products.map((product, index) => {
          const itemValue = `product-${index}`;

          return (
            <ProductItem
              key={itemValue}
              product={product}
              itemIndex={itemValue}
              isItemOpen={openItems.includes(itemValue)}
            />
          );
        })}
      </Accordion>
    </section>
  );
}

type ProductItemProps = {
  product: ProductDraft;
  itemIndex: string;
  isItemOpen: boolean;
};

function ProductItem({ product, itemIndex, isItemOpen }: ProductItemProps) {
  return (
    <AccordionItem
      value={itemIndex}
      className="flex flex-col gap-4 rounded-xl border border-dashed border-slate-200 bg-white px-6 py-8 shadow-card"
    >
      <div className="flex w-full items-start justify-between">
        <Identity product={product} />
        <AccordionTrigger className="p-0" />
      </div>
      <AccordionContent className="flex flex-col gap-4">
        <Variants productId={product.id} variants={product.variants} />
        <Images
          variants={product.variants}
          imagesGroupByAttributes={product.imageGroupingAttributes}
        />
      </AccordionContent>
      {!isItemOpen && <Summary variants={product.variants} />}
    </AccordionItem>
  );
}
