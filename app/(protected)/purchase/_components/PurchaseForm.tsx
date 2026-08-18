"use client";

import type { HTMLInputTypeAttribute, ReactNode } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import {
  purchaseFormSchema,
  type PurchaseFormValues,
} from "../_schemas/purchase-schema";

type PurchaseFieldName = keyof PurchaseFormValues;

type PurchaseField = {
  id: string;
  name: PurchaseFieldName;
  label: string;
  subLabel: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  description?: string;
  required?: boolean;
  multiline?: boolean;
};

type PurchaseFormProps = {
  defaultValues: PurchaseFormValues;
  submitLabel: string;
  submittingLabel?: string;
  isSubmitting?: boolean;
  secondaryAction?: ReactNode;
  onSubmit: (values: PurchaseFormValues) => void | Promise<void>;
};

const purchaseFields: PurchaseField[] = [
  {
    id: "supplier",
    name: "supplier",
    label: "Supplier",
    subLabel: "အဝယ်",
    placeholder: "Happy Kids Wholesale",
    required: true,
  },
  {
    id: "purchase-date",
    name: "purchaseDate",
    label: "Purchase Date",
    subLabel: "ဝယ်ယူသည့်ရက်စွဲ",
    type: "date",
    required: true,
  },
  {
    id: "expected-products",
    name: "expectedProducts",
    label: "Expected Products",
    subLabel: "ဝယ်ယူ ပစ္စည်းအရေအတွက်",
    type: "number",
    placeholder: "5",
    required: true,
  },
  {
    id: "total-price",
    name: "totalPrice",
    label: "Total Price",
    subLabel: "စုစုပေါင်းကုန်ကျငွေ",
    type: "number",
    placeholder: "420000",
    required: true,
  },
  {
    id: "note",
    name: "note",
    label: "Note",
    subLabel: "မှတ်ချက်",
    placeholder: "Add purchase note",
    multiline: true,
  },
];

export function PurchaseForm({
  defaultValues,
  submitLabel,
  submittingLabel = "Saving...",
  isSubmitting = false,
  secondaryAction,
  onSubmit,
}: PurchaseFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseFormSchema),
    mode: "onSubmit",
    defaultValues,
  });

  async function submitPurchase(values: PurchaseFormValues) {
    await onSubmit({
      ...values,
      note: values.note?.trim() ? values.note.trim() : null,
    });
  }

  return (
    <form
      className="flex min-h-0 flex-col "
      onSubmit={handleSubmit(submitPurchase)}
    >
      <div className="relative min-h-0">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-linear-to-b from-popover to-transparent backdrop-blur-[1px]" />

        <div className="scrollbar-soft max-h-[min(520px,calc(100dvh-14rem))] overflow-y-auto overscroll-contain px-1 py-6">
          <FieldGroup className="grid grid-cols-2 gap-8">
            {purchaseFields.map((field) => {
              const fieldError = errors[field.name];

              return (
                <Field
                  key={field.id}
                  data-invalid={Boolean(fieldError)}
                  className={field.multiline ? "col-span-2" : undefined}
                >
                  <FieldLabel
                    htmlFor={field.id}
                    className="flex flex-col items-start"
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

                  {field.multiline ? (
                    <Textarea
                      id={field.id}
                      placeholder={field.placeholder}
                      autoComplete="off"
                      aria-invalid={Boolean(fieldError)}
                      className={cn(
                        "rounded-lg",
                        fieldError && "ring-2 ring-pink-700/30",
                      )}
                      {...register(field.name)}
                    />
                  ) : (
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
                  )}

                  {field.description && (
                    <FieldDescription>{field.description}</FieldDescription>
                  )}
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
          {secondaryAction}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? submittingLabel : submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}
