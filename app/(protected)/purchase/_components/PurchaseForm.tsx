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

import DualText from "@/components/DualText";
import {
  PurchaseRecord,
  purchaseRecordFormValuesSchema,
  type PurchaseRecordFormValues,
} from "../_schemas/purchase-schema";

import { useCreatePurchase, useUpdatePurchase } from "../_hooks/use-purchases";

type PurchaseFieldName = keyof PurchaseRecordFormValues;

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
  className?: string;
};

type PurchaseFormProps = {
  purchase?: PurchaseRecord | null;
  onClose: () => void;
};

const emptyPurchaseValues: PurchaseRecordFormValues = {
  supplier: "",
  expectedProducts: 0,
  expectedVariants: 0,
  date: "",
  totalPrice: 0,
  note: null,
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
    name: "date",
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
    id: "expected-variants",
    name: "expectedVariants",
    label: "Expected Variants",
    subLabel: "ပစ္စည်း မျိူးကွဲများ",
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
    className: "col-span-2",
  },
  {
    id: "note",
    name: "note",
    label: "Note",
    subLabel: "မှတ်ချက်",
    placeholder: "Add purchase note",
    multiline: true,
    className: "col-span-2",
  },
];

export function PurchaseForm({ purchase, onClose }: PurchaseFormProps) {
  const createPurchase = useCreatePurchase();
  const updatePurchase = useUpdatePurchase();

  const isEditing = Boolean(purchase);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseRecordFormValues>({
    resolver: zodResolver(purchaseRecordFormValuesSchema),
    defaultValues: purchase ?? emptyPurchaseValues,
  });

  const isSubmitting = createPurchase.isPending || updatePurchase.isPending;

  async function submitPurchase(values: PurchaseRecordFormValues) {
    const input = {
      ...values,
      note: values.note?.trim() || null,
    };

    if (purchase) {
      await updatePurchase.mutateAsync({
        id: purchase.id,
        input,
      });

      return onClose();
    }

    await createPurchase.mutateAsync(input);
    onClose();
  }

  return (
    <form
      onSubmit={handleSubmit(submitPurchase)}
      className="flex min-h-0 flex-col"
    >
      <DualText className="pt-4" label="New Purchase" subLabel="ဝယ်ယူမှုအသစ်" />

      <div className="relative min-h-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-linear-to-b from-popover to-transparent backdrop-blur-[1px] " />

        <div className="scrollbar-soft max-h-[min(520px,calc(100dvh-14rem))] overflow-y-auto overscroll-contain px-1 py-6 pb-16 bg-amber-10">
          <FieldGroup className="grid grid-cols-2 gap-8">
            {purchaseFields.map((field) => {
              const error = errors[field.name];

              return (
                <Field
                  key={field.id}
                  data-invalid={Boolean(error)}
                  className={field.className}
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
                      aria-invalid={Boolean(error)}
                      className={cn(
                        "rounded-lg",
                        error && "ring-2 ring-pink-700/30",
                      )}
                      {...register(field.name)}
                    />
                  ) : (
                    <Input
                      id={field.id}
                      type={field.type ?? "text"}
                      placeholder={field.placeholder}
                      autoComplete="off"
                      aria-invalid={Boolean(error)}
                      className={cn(error && "ring-2 ring-pink-700/30")}
                      {...register(field.name, {
                        valueAsNumber: field.type === "number",
                      })}
                    />
                  )}

                  {field.description && (
                    <FieldDescription>{field.description}</FieldDescription>
                  )}

                  {error?.message && <FieldError>{error.message}</FieldError>}
                </Field>
              );
            })}
          </FieldGroup>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-linear-to-t from-popover to-transparent backdrop-blur-[1px]" />
      </div>

      <div className="flex shrink-0 justify-end gap-4 pt-2">
        <Button
          variant="outline"
          showIcon={false}
          disabled={isSubmitting}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : isEditing
              ? "Save Changes"
              : "Create Purchase"}
        </Button>
      </div>
    </form>
  );
}
