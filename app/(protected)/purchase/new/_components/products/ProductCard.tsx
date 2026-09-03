"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import DualText from "@/components/DualText";
import { Button } from "@/components/ui/button";
import { subcategories } from "@/lib/products/product-taxonomy";
import { cn } from "@/lib/utils";

import { ProductCollapsedSummary } from "./ProductCollapsedSummary";
import {
  getImageGroups,
  ProductImagesSection,
} from "./ProductImagesSection";
import { ProductIdentitySection } from "./ProductIdentitySection";
import { ProductVariantsSection } from "./ProductVariantsSection";

export function ProductCard({ product, onChange, onRemove }: any) {
  const [isOpen, setIsOpen] = useState(true);

  const variants = product.variants ?? [];
  const selectedSubcategory = subcategories.find(
    (subcategory: any) => subcategory.id === product.subcategoryId,
  );
  const variantAttributes = selectedSubcategory?.variantAttributes ?? [
    "color",
    "size",
  ];
  const imageGroupBy = selectedSubcategory?.imageGroupBy ?? ["color"];
  const imageGroups = getImageGroups(variants, imageGroupBy);

  const totalQty = variants.reduce(
    (total: number, variant: any) => total + Number(variant.qty || 0),
    0,
  );
  const grandTotal = variants.reduce(
    (total: number, variant: any) =>
      total + Number(variant.qty || 0) * Number(variant.unitPrice || 0),
    0,
  );

  function updateProduct(nextValue: any) {
    onChange({ ...product, ...nextValue });
  }

  function updateVariant(variantId: string, nextValue: any) {
    updateProduct({
      variants: variants.map((variant: any) =>
        variant.id === variantId ? { ...variant, ...nextValue } : variant,
      ),
    });
  }

  function updateVariantAttribute(
    variantId: string,
    attribute: string,
    value: string,
  ) {
    updateProduct({
      variants: variants.map((variant: any) =>
        variant.id === variantId
          ? {
              ...variant,
              attributes: { ...variant.attributes, [attribute]: value },
            }
          : variant,
      ),
    });
  }

  function updateProductImage(groupKey: string, fileName: string) {
    const currentImages = product.images ?? [];
    const nextImage = { groupKey, fileName };

    updateProduct({
      images: currentImages.some((image: any) => image.groupKey === groupKey)
        ? currentImages.map((image: any) =>
            image.groupKey === groupKey ? nextImage : image,
          )
        : [...currentImages, nextImage],
    });
  }

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-dashed border-slate-200 bg-white p-4 shadow-card">
      <header className="flex items-start justify-between gap-4">
        <DualText
          label="Product Identity"
          subLabel="ကုန်ပစ္စည်းအချက်အလက်"
          size="sm"
        />

        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="fit"
            showIcon={false}
            onClick={() => setIsOpen((currentValue) => !currentValue)}
          >
            {isOpen ? "Hide" : "Show"}
            <ChevronDown
              className={cn(
                "size-4 transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </Button>

          <Button
            type="button"
            variant="ghost"
            tone="destructive"
            size="fit"
            showIcon={false}
            onClick={onRemove}
          >
            Remove
          </Button>
        </div>
      </header>

      <ProductIdentitySection product={product} onChange={updateProduct} />

      {!isOpen && (
        <ProductCollapsedSummary
          totalQty={totalQty}
          grandTotal={grandTotal}
          imageTotal={imageGroups.length}
          variantTotal={variants.length}
        />
      )}

      {isOpen && (
        <>
          <ProductVariantsSection
            variants={variants}
            variantAttributes={variantAttributes}
            totalQty={totalQty}
            grandTotal={grandTotal}
            onVariantChange={updateVariant}
            onVariantAttributeChange={updateVariantAttribute}
          />

          <ProductImagesSection
            images={product.images}
            imageGroups={imageGroups}
            onImageChange={updateProductImage}
          />
        </>
      )}
    </article>
  );
}
