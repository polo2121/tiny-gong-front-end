"use client";

import type { HTMLInputTypeAttribute } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  productFormSchema,
  type ProductFormValues,
} from "../../_schemas/purchase-product-schema";

import { HugeiconsIcon } from "@hugeicons/react";
import { AArrowDown } from "@hugeicons/core-free-icons";

const productCategoryOptions = [
  { label: "Clothing", value: "clothing" },
  { label: "Books", value: "books" },
  { label: "Toys", value: "toys" },
] as const;

type ProductFieldName = keyof ProductFormValues;

type ProductField = {
  id: string;
  name: ProductFieldName;
  label: string;
  subLabel: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const productFields: ProductField[] = [
  {
    id: "product-name",
    name: "name",
    label: "Product Name",
    subLabel: "ကုန်ပစ္စည်းအမည်",
    placeholder: "Kids cotton t-shirt",
    required: true,
  },
  {
    id: "sell-price",
    name: "sellPrice",
    label: "Sell Price",
    subLabel: "ရောင်းဈေး",
    type: "number",
    placeholder: "12000",
    required: true,
  },
  {
    id: "purchase-price",
    name: "purchasePrice",
    label: "Purchase Price",
    subLabel: "ဝယ်ဈေး",
    type: "number",
    placeholder: "8000",
    required: true,
  },
  {
    id: "expected-variants",
    name: "expectedVariants",
    label: "Expected Variants",
    subLabel: "အမျိုးအစားအရေအတွက်",
    type: "number",
    placeholder: "5",
    required: true,
  },
];

const emptyProductFormValues: ProductFormValues = {
  name: "",
  category: "clothing",
  sellPrice: 0,
  purchasePrice: 0,
  expectedVariants: 1,
};

type ProductRegisterFormProps = {
  defaultValues?: ProductFormValues;
  submitLabel?: string;
  onClose?: () => void;
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
};

export function ProductRegisterForm({
  defaultValues,
  submitLabel = "Save Product",
  onClose,
  onSubmit,
}: ProductRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    mode: "onSubmit",
    defaultValues: defaultValues ?? emptyProductFormValues,
  });

  function submitProduct(values: ProductFormValues) {
    void onSubmit(values);
  }

  return (
    <form
      className="w-full flex min-h-0 flex-col"
      onSubmit={handleSubmit(submitProduct)}
    >
      <div className="relative min-h-0">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-linear-to-b from-popover to-transparent backdrop-blur-[1px]" />

        <div className="max-h-[min(520px,calc(100dvh-14rem))] overflow-y-auto overscroll-contain px-1 py-6">
          <FieldGroup className="grid grid-cols-2 gap-8">
            <Field data-invalid={Boolean(errors.category)} className="relative">
              <FieldLabel
                htmlFor="product-category"
                className="flex flex-col items-start"
              >
                <span>
                  Category
                  <span aria-hidden="true" className="text-destructive">
                    *
                  </span>
                </span>
                <small className="relative -top-1.25 font-umoe text-sm text-muted-foreground">
                  (အမျိုးအစား)
                </small>
              </FieldLabel>

              <select
                id="product-category"
                className={cn(
                  "h-12 w-full rounded-xl bg-slate-100 px-6 text-sm font-medium shadow-card-two outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50",
                  errors.category && "ring-2 ring-pink-700/30",
                )}
                aria-invalid={Boolean(errors.category)}
                {...register("category")}
              >
                {productCategoryOptions.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <HugeiconsIcon
                className="size-4 absolute bottom-3.5 w-fit! right-4"
                icon={AArrowDown}
                strokeWidth={2.2}
              />

              {errors.category?.message && (
                <FieldError>{errors.category.message}</FieldError>
              )}
            </Field>

            {productFields.map((field) => {
              const fieldError = errors[field.name];

              return (
                <Field
                  key={field.id}
                  data-invalid={Boolean(fieldError)}
                  className={field.className}
                >
                  <FieldLabel
                    htmlFor={field.id}
                    className={cn("grid flex-col items-start col-span-2")}
                  >
                    <span>
                      {field.label}
                      {field.required && (
                        <span aria-hidden="true" className="text-destructive">
                          *
                        </span>
                      )}
                    </span>
                    <small className="relative -top-1.25 font-umoe text-sm text-muted-foreground">
                      ({field.subLabel})
                    </small>
                  </FieldLabel>

                  <Input
                    id={field.id}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder}
                    autoComplete="off"
                    aria-invalid={Boolean(fieldError)}
                    className={cn(fieldError && "ring-2 ring-pink-700/30")}
                    {...register(field.name, {
                      valueAsNumber: field.type === "number",
                    })}
                  />

                  {fieldError?.message && (
                    <FieldError>{fieldError.message}</FieldError>
                  )}
                </Field>
              );
            })}
          </FieldGroup>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-linear-to-t from-popover to-transparent backdrop-blur-[1px]" />
      </div>

      <div className="shrink-0">
        <div className="flex justify-end gap-4 pt-2">
          <Button variant="outline" showIcon={false} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={false}>
            {submitLabel}
            {/* {isSubmitting ? submittingLabel : submitLabel} */}
          </Button>
        </div>
      </div>
    </form>
  );
}
