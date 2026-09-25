"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePurchaseDraft } from "../../_context/purchase-draft.context";
import {
  getCategoryOptions,
  getSubcategoryOptions,
} from "@/lib/categories/helpers";
import { ProductDraft } from "@/lib/purchase-draft/new-purchase-schema";

type IdentityProps = {
  product: ProductDraft;
};

export function Identity({ product }: IdentityProps) {
  const updateProductName = usePurchaseDraft(
    (state) => state.updateProductName,
  );
  const updateCategory = usePurchaseDraft((state) => state.updateCategory);

  const updateSubcategory = usePurchaseDraft(
    (state) => state.updateSubcategory,
  );

  const categoryOptions = getCategoryOptions();
  const subcategoryOptions = getSubcategoryOptions(
    product.category ?? "clothing",
  );

  const hasSub = subcategoryOptions.length > 0;
  const activeCategory = product.category;
  const activeSubcategory = product.subcategory;

  return (
    <div className=" w-full grid grid-cols-3 gap-4 ">
      <Field>
        <FieldLabel htmlFor={`${product.id}-name`} className="opacity-80">
          Product Name
        </FieldLabel>
        <Input
          id={`${product.id}-name`}
          defaultValue={product.name}
          placeholder="Type product name..."
          autoComplete="off"
          className="flex-none rounded-lg border border-slate-100 bg-slate-50 px-4 font-margarine font-normal text-highlight-soft min-h-0"
          onChange={(e) => updateProductName(product.id, e.target.value)}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor={`${product.id}-category`}>Category</FieldLabel>

        <Select
          items={categoryOptions}
          value={product.category}
          onValueChange={(value) => {
            if (value) updateCategory(product.id, value);
          }}
        >
          <SelectTrigger
            id={`${product.id}-category`}
            className={cn(
              "w-full",
              activeCategory && "text-highlight border-highlight",
            )}
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent>
            {categoryOptions.map((option: any) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field>
        <FieldLabel htmlFor={`${product.id}-subcategory`}>
          Subcategory
        </FieldLabel>

        <Select
          items={subcategoryOptions}
          value={product.subcategory}
          onValueChange={(value) => {
            if (value) updateSubcategory(product.id, value);
          }}
          disabled={!hasSub}
        >
          <SelectTrigger
            id={`${product.id}-subcategory`}
            className={cn(
              "w-full",
              activeSubcategory && "text-highlight border-highlight",
            )}
          >
            <SelectValue placeholder="Select subcategory" />
          </SelectTrigger>

          <SelectContent>
            {subcategoryOptions.map((option: any) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}
