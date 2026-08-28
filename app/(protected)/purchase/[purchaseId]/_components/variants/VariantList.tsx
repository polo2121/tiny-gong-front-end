"use client";

import { useState } from "react";
import { NoVariantsState } from "../states/NoVariantsState";
import { VariantItem } from "./VariantItem";
import type { Variant } from "../../_schemas/purchase-product-schema";
import { useProductDraftStore } from "../../_stores/use-product-draft-store";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { PackageAddIcon } from "@hugeicons/core-free-icons";
import { VariantFormDrawer } from "./VariantFormDrawer";

type VariantListProps = {
  productId: string;
  productName: string;
  variants: Variant[];
};

export function VariantList({
  productId,
  productName,
  variants,
}: VariantListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const hasVariants = variants.length > 0;

  function openCreateVariantDrawer() {
    setSelectedVariant(null);
    setIsOpen(true);
  }

  function openEditVariantDrawer(variant: Variant) {
    setSelectedVariant(variant);
    setIsOpen(true);
  }

  return (
    <div className="rounded-lg bg-white px-4 py-4 shadow-card">
      <div className="min-w-150">
        <div className="grid grid-cols-[96px_1fr_1fr_1fr_88px_96px] gap-3 border-b border-dashed border-slate-200 px-3 pb-3 font-margarine text-sm text-muted-foreground">
          <span>Thumbnail</span>
          <span>Size</span>
          <span>Color</span>
          <span>Gender</span>
          <span>Stock</span>
        </div>

        {!hasVariants ? (
          <NoVariantsState onCreateVariant={openCreateVariantDrawer} />
        ) : (
          <div className="flex flex-col">
            {variants.map((variant) => (
              <VariantItem
                key={variant.id}
                productId={productId}
                productName={productName}
                variant={variant}
                onEdit={openEditVariantDrawer}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={openCreateVariantDrawer}
              className="m-auto mt-4"
            >
              <HugeiconsIcon
                icon={PackageAddIcon}
                color="currentColor"
                strokeWidth={2.2}
              />
              Add Variant
            </Button>
          </div>
        )}

        <VariantFormDrawer
          open={isOpen}
          onOpenChange={setIsOpen}
          productId={productId}
          variant={selectedVariant}
        />
      </div>
    </div>
  );
}
