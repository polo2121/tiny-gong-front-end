"use client";

import { CategoryBadge } from "@/app/(protected)/daily-sales/new/_components/category-badge";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { Button } from "@/components/ui/button";

import { Product } from "../../_schemas/purchase-product-schema";
import { VariantList } from "../variants/VariantList";
import { formatCurrency } from "@/lib/currency";

type ProductCardProps = {
  product: Product;
  onEdit: (product: Product) => void;
};

export function ProductCard({ product, onEdit }: ProductCardProps) {
  return (
    <article className="overflow-hidden flex flex-col gap-6 pt-8 pb-4 px-4 rounded-2xl bg-card-surface shadow-card border border-slate-100">
      <header className="grid items-start gap-4 xl:grid-cols-[minmax(220px,1fr)_140px_150px_auto]">
        <div className="min-w-0 flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-highlight-soft font-medium">
              {product.seriesCode}
            </span>
            <CategoryBadge category={product.category} className="bg-white" />
          </div>

          <h3 className="font-margarine mt-1 wrap-break-words text-lg text-highlight-soft">
            {product.name}
          </h3>
        </div>

        <div className="min-w-0 flex flex-col">
          <p className="font-margarine text-sm text-muted-foreground">
            Purchase Price
          </p>
          <strong className="mt-1 block text-lg leading-6">
            {formatCurrency(product.purchasePrice)} MMK
          </strong>
        </div>

        <div className="min-w-0 flex flex-col">
          <p className="font-margarine text-sm text-muted-foreground">
            Sell Price
          </p>
          <strong className="mt-1 block text-lg leading-6">
            {formatCurrency(product.sellPrice)} MMK
          </strong>
        </div>

        <div className="flex justify-end gap-2 ">
          <Button
            variant="ghost"
            size="fit"
            showIcon={false}
            onClick={() => onEdit(product)}
          >
            Edit
          </Button>
          <Button
            variant="outline-dashed"
            tone="destructive"
            showIcon={false}
            size="fit"
          >
            <TrashIcon className="size-4" />
          </Button>
        </div>
      </header>

      <VariantList
        productId={product.id}
        productName={product.name}
        variants={product.variants}
      />
    </article>
  );
}
