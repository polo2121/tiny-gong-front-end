import { CategoryBadge } from "@/app/(protected)/daily-sales/new/_components/category-badge";
import ImagePreview from "@/components/ImagePreview";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { Button } from "@/components/ui/button";

import type { RegisteredProduct } from "../../_types/purchase";

type ProductCardProps = {
  product: RegisteredProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const variantRows =
    product.registeredVariantIds.length > 0
      ? product.registeredVariantIds
      : ["No variants registered yet."];

  return (
    <article className="overflow-hidden flex flex-col gap-6 pt-8 pb-4 px-4 rounded-2xl bg-card-surface shadow-card border border-slate-100">
      <header className="grid items-start gap-4 xl:grid-cols-[minmax(220px,1fr)_140px_150px_auto]">
        <div className="min-w-0 flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category="Clothing" className="bg-white" />
            <span className="font-margarine text-sm text-highlight-soft">
              {product.id}
            </span>
          </div>

          <h3 className="mt-1 wrap-break-words text-lg font-bold text-highlight-soft">
            {product.name}
          </h3>
        </div>

        <div className="min-w-0 flex flex-col">
          <p className="font-margarine text-sm text-muted-foreground">
            Sell Price
          </p>
          <strong className="mt-1 block text-lg leading-6">12,000 MMK</strong>
        </div>

        <div className="min-w-0 flex flex-col">
          <p className="font-margarine text-sm text-muted-foreground">
            Purchase Price
          </p>
          <strong className="mt-1 block text-lg leading-6">8,000 MMK</strong>
        </div>

        <div className="flex justify-end gap-2 ">
          <Button variant="ghost" size="fit" showIcon={false}>
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

      <div className="rounded-lg bg-white px-4 py-4 shadow-card">
        <div className="overflow-x-auto scrollbar-soft">
          <div className="min-w-150">
            <div className="grid grid-cols-[96px_1fr_1fr_1fr_88px_96px] gap-3 border-b border-dashed border-slate-5  px-3 pb-3 font-margarine text-sm text-muted-foreground">
              <span>Thumbnail</span>
              <span>Size</span>
              <span>Color</span>
              <span>Gender</span>
              <span>Stock</span>
              <span className="text-right">Action</span>
            </div>

            <div className="scrollbar-soft mt-2 grid max-h-76 gap-2 overflow-y-auto">
              {variantRows.map((variantId) => (
                <div
                  key={variantId}
                  className="grid min-h-16 grid-cols-[96px_1fr_1fr_1fr_88px_96px] items-center gap-3 border-b border-dashed border-slate-200 px-3 py-2 text-sm font-semibold"
                >
                  <ImagePreview
                    src=""
                    alt={`${product.name} variant thumbnail`}
                    fallbackLabel="No Image"
                    className="size-14 min-w-10 min-h-10  rounded-sm"
                  />
                  <span>130</span>
                  <span>Sky Blue</span>
                  <span>Unisex</span>
                  <span>1</span>
                  <div className="flex justify-end font-normal">
                    <Button variant="ghost" size="fit" showIcon={false}>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
