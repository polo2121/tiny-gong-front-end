"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { categories, subcategories } from "@/lib/products/product-taxonomy";

import { ProductSelect } from "./ProductSelect";

export function ProductIdentitySection({ product, onChange }: any) {
  const categoryOptions = categories.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));
  const subcategoryOptions = subcategories
    .filter((subcategory: any) => subcategory.categoryId === product.categoryId)
    .map((subcategory: any) => ({
      label: subcategory.name,
      value: subcategory.id,
    }));

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Field>
        <FieldLabel htmlFor={`${product.id}-name`} className="opacity-80">
          Product Name
        </FieldLabel>
        <Input
          id={`${product.id}-name`}
          value={product.name}
          placeholder="Type product name..."
          autoComplete="off"
          onChange={(event) => onChange({ name: event.target.value })}
          className="flex-none rounded-lg border border-slate-100 bg-slate-50 px-2 font-margarine font-normal text-highlight-soft md:text-base"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor={`${product.id}-category`} className="opacity-80">
          Category
        </FieldLabel>
        <ProductSelect
          value={product.categoryId}
          placeholder="Choose category"
          options={categoryOptions}
          onValueChange={(categoryId: string) =>
            onChange({ categoryId, subcategoryId: "" })
          }
        />
      </Field>

      <Field>
        <FieldLabel
          htmlFor={`${product.id}-subcategory`}
          className="opacity-80"
        >
          Subcategory
        </FieldLabel>
        <ProductSelect
          value={product.subcategoryId}
          placeholder={
            product.categoryId ? "Choose subcategory" : "Choose category first"
          }
          options={subcategoryOptions}
          disabled={!product.categoryId}
          onValueChange={(subcategoryId: string) => onChange({ subcategoryId })}
        />
      </Field>
    </div>
  );
}
