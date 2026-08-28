"use client";

import ImagePreview from "@/components/ImagePreview";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { Button } from "@/components/ui/button";

import type { Variant } from "../../_schemas/purchase-product-schema";

type VariantItemProps = {
  productId: string;
  productName: string;
  variant: Variant;
  onEdit: (variant: Variant) => void;
};

export function VariantItem({
  productName,
  variant,
  onEdit,
}: VariantItemProps) {
  return (
    <div className="grid min-h-16 grid-cols-[96px_1fr_1fr_1fr_88px_96px] items-center gap-3 border-b border-dashed border-slate-200 px-3 py-2 text-sm font-semibold">
      <ImagePreview
        src=""
        alt={`${productName} variant thumbnail`}
        fallbackLabel="No Image"
        className="size-14 min-h-10 min-w-10 rounded-sm"
      />
      <span>{variant.size}</span>
      <span>{variant.color}</span>
      <span>{variant.name}</span>
      <span>{variant.quantity}</span>
      <div className="flex justify-end font-normal">
        <Button
          variant="ghost"
          size="fit"
          showIcon={false}
          onClick={() => onEdit(variant)}
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
    </div>
  );
}
