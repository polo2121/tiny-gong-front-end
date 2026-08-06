"use client";

import type { HTMLInputTypeAttribute } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import DualText from "@/components/DualText";
import { cn } from "@/lib/utils";
import { usePurchaseStore } from "../_stores/use-purchase-store";

const requiredNumber = (message: string) =>
  z.number({ message }).min(1, message);

const purchaseFormSchema = z.object({
  supplier: z.string().trim().min(1, "Supplier is required."),
  purchaseDate: z.string().min(1, "Purchase date is required."),
  expectedProducts: requiredNumber("Products must be at least 1."),
  amount: requiredNumber("Amount must be at least 1."),
  note: z.string().trim().optional(),
});

type PurchaseFormValues = z.infer<typeof purchaseFormSchema>;
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
    id: "products",
    name: "expectedProducts",
    label: "Products",
    subLabel: "ပစ္စည်းများ",
    type: "number",
    placeholder: "5",
    required: true,
  },
  {
    id: "amount",
    name: "amount",
    label: "Amount",
    subLabel: "ပမာဏ်",
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

export function NewPurchaseDrawer() {
  const addPurchase = usePurchaseStore((state) => state.addPurchase);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseFormSchema),
    mode: "onSubmit",
    defaultValues: {
      supplier: "",
      purchaseDate: "",
      note: "",
    },
  });

  function savePurchaseDraft(purchase: PurchaseFormValues) {
    // console.log("Purchase draft:", purchase);
    addPurchase({
      id: `PO-${Date.now()}`,
      supplier: purchase.supplier,
      expectedProducts: purchase.expectedProducts,
      registeredProducts: [],
      amount: `${purchase.amount.toLocaleString()} MMK`,
      date: purchase.purchaseDate,
    });
    // TODO: Save this purchase draft to the purchase store or backend.
  }

  return (
    <Drawer>
      <DrawerTrigger render={<Button type="button" />}>
        New Purchase
      </DrawerTrigger>
      <DrawerContent className="m-auto max-w-2xl px-8 py-4 [--drawer-height:min(700px,calc(100dvh-2rem))]">
        <form
          className="flex h-full min-h-0 flex-col "
          onSubmit={handleSubmit(savePurchaseDraft)}
        >
          <DrawerHeader className="items-start justify-start shrink-0">
            <DualText label="New Purchase" subLabel="ဝယ်ယူမှုအသစ်" size="lg" />
          </DrawerHeader>

          <div className="relative min-h-0 flex-1 ">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-linear-to-b from-popover to-transparent backdrop-blur-[1px]" />

            <div className="scrollbar-soft h-full overflow-y-auto overscroll-contain px-1 py-6">
              <FieldGroup className="grid grid-cols-2 gap-4">
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
                            <span
                              aria-hidden="true"
                              className="text-destructive "
                            >
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
                          className={cn(
                            fieldError && "ring-2 ring-pink-700/30",
                          )}
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

          <DrawerFooter className="shrink-0 overflow-auto ">
            <div className="flex gap-4 justify-end  pt-2">
              <DrawerClose
                render={
                  <Button type="button" variant="outline" showIcon={false} />
                }
              >
                Cancel
              </DrawerClose>
              <Button type="submit">Save Purchase</Button>
            </div>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
