"use client";

import { FormDrawer } from "@/components/FormDrawer";

import {
  type Variant,
  type VariantFormValues,
} from "../../_schemas/purchase-product-schema";
import { useProductDraftStore } from "../../_stores/use-product-draft-store";
import { VariantRegisterForm } from "./VariantRegisterForm";

type VariantFormDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  variant: Variant | null;
};

function getVariantFormDefaultValues(variant: Variant): VariantFormValues {
  return {
    name: variant.name,
    size: variant.size,
    color: variant.color,
    quantity: variant.quantity,
  };
}

export function VariantFormDrawer({
  open,
  onOpenChange,
  productId,
  variant,
}: VariantFormDrawerProps) {
  const createVariant = useProductDraftStore((state) => state.createVariant);
  const editVariant = useProductDraftStore((state) => state.editVariant);

  const isEditing = Boolean(variant);
  const defaultValues = variant
    ? getVariantFormDefaultValues(variant)
    : undefined;

  function closeDrawer() {
    onOpenChange(false);
  }

  function saveVariant(values: VariantFormValues) {
    if (variant) {
      editVariant(productId, variant.id, values);
    } else {
      createVariant(productId, values);
    }

    closeDrawer();
  }

  return (
    <FormDrawer
      title={isEditing ? "Edit Variant" : "New Variant"}
      subTitle={isEditing ? "ကုန်ပစ္စည်းပြင်ဆင်ရန်" : "ကုန်ပစ္စည်းအသစ်"}
      open={open}
      onOpenChange={onOpenChange}
    >
      <VariantRegisterForm
        key={variant?.id ?? "new-variant"}
        defaultValues={defaultValues}
        submitLabel={isEditing ? "Save Changes" : "Save Variant"}
        onClose={closeDrawer}
        onSubmit={saveVariant}
      />
    </FormDrawer>
  );
}
