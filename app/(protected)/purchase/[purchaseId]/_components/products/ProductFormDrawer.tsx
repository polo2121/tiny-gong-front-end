"use client";

import { FormDrawer } from "@/components/FormDrawer";

import {
  type Product,
  type ProductFormValues,
} from "../../_schemas/purchase-product-schema";
import { useProductDraftStore } from "../../_stores/use-product-draft-store";
import { ProductRegisterForm } from "./ProductRegisterForm";

type ProductFormDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
};

function getProductFormDefaultValues(product: Product): ProductFormValues {
  return {
    name: product.name,
    category: product.category,
    sellPrice: product.sellPrice,
    purchasePrice: product.purchasePrice,
    expectedVariants: product.expectedVariants,
  };
}

export function ProductFormDrawer({
  open,
  onOpenChange,
  product,
}: ProductFormDrawerProps) {
  const createProduct = useProductDraftStore((state) => state.createProduct);
  const editProduct = useProductDraftStore((state) => state.editProduct);

  const isEditing = Boolean(product);
  const defaultValues = product
    ? getProductFormDefaultValues(product)
    : undefined;

  function closeDrawer() {
    onOpenChange(false);
  }

  function saveProduct(values: ProductFormValues) {
    if (product) {
      editProduct(product.id, values);
    } else {
      createProduct(values);
    }

    closeDrawer();
  }

  return (
    <FormDrawer
      title={isEditing ? "Edit Product" : "New Product"}
      subTitle={isEditing ? "ကုန်ပစ္စည်းပြင်ဆင်ရန်" : "ကုန်ပစ္စည်းအသစ်"}
      open={open}
      onOpenChange={onOpenChange}
    >
      <ProductRegisterForm
        key={product?.id ?? "new-product"}
        defaultValues={defaultValues}
        submitLabel={isEditing ? "Save Changes" : "Save Product"}
        onClose={closeDrawer}
        onSubmit={saveProduct}
      />
    </FormDrawer>
  );
}
