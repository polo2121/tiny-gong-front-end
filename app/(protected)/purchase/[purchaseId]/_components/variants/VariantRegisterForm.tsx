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
  variantFormSchema,
  type VariantFormValues,
} from "../../_schemas/purchase-product-schema";

type VariantFieldName = keyof VariantFormValues;

type VariantField = {
  id: string;
  name: VariantFieldName;
  label: string;
  subLabel: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
};

const variantFields: VariantField[] = [
  {
    id: "variant-name",
    name: "name",
    label: "Variant Name",
    subLabel: "အမျိုးအစားအမည်",
    placeholder: "Blue / Small",
    required: true,
  },
  {
    id: "variant-size",
    name: "size",
    label: "Size",
    subLabel: "အရွယ်အစား",
    placeholder: "S",
    required: true,
  },
  {
    id: "variant-color",
    name: "color",
    label: "Color",
    subLabel: "အရောင်",
    placeholder: "Blue",
    required: true,
  },
  {
    id: "variant-quantity",
    name: "quantity",
    label: "Quantity",
    subLabel: "အရေအတွက်",
    type: "number",
    placeholder: "10",
    required: true,
  },
];

const emptyVariantFormValues: VariantFormValues = {
  name: "",
  size: "",
  color: "",
  quantity: 1,
};

type VariantRegisterFormProps = {
  defaultValues?: VariantFormValues;
  submitLabel?: string;
  onClose?: () => void;
  onSubmit: (values: VariantFormValues) => void | Promise<void>;
};

export function VariantRegisterForm({
  defaultValues,
  submitLabel = "Save Variant",
  onClose,
  onSubmit,
}: VariantRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VariantFormValues>({
    resolver: zodResolver(variantFormSchema),
    mode: "onSubmit",
    defaultValues: defaultValues ?? emptyVariantFormValues,
  });

  function submitVariant(values: VariantFormValues) {
    void onSubmit(values);
  }

  return (
    <form
      className="flex min-h-0 w-full flex-col"
      onSubmit={handleSubmit(submitVariant)}
    >
      <div className="relative min-h-0">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-linear-to-b from-popover to-transparent backdrop-blur-[1px]" />

        <div className="max-h-[min(520px,calc(100dvh-14rem))] overflow-y-auto overscroll-contain px-1 py-6">
          <FieldGroup className="grid grid-cols-2 gap-8">
            {variantFields.map((field) => {
              const fieldError = errors[field.name];

              return (
                <Field key={field.id} data-invalid={Boolean(fieldError)}>
                  <FieldLabel
                    htmlFor={field.id}
                    className="grid flex-col items-start col-span-2"
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
          <Button type="submit">{submitLabel}</Button>
        </div>
      </div>
    </form>
  );
}
