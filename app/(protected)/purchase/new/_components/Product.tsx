"use client";

import { Trash2 } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { usePurchaseDraftStore } from "../_store/purchase-draft.store";
import {
  categories,
  getSubcategoriesByCategory,
  type CategoryId,
  type SubcategoryId,
} from "../_taxonomy/product-taxonomy";

import { Images } from "./Images";
import { Variants } from "./Variants";
import {
  getValidationError,
  type PurchaseValidationIssues,
} from "../_validation/validation-errors";

type ProductProps = {
  productId: string;
  productIndex: number;
  canRemove: boolean;
  validationIssues: PurchaseValidationIssues;
  onStructuralChange: () => void;
};

export function Product({
  productId,
  productIndex,
  canRemove,
  validationIssues,
  onStructuralChange,
}: ProductProps) {
  const product = usePurchaseDraftStore(
    useShallow((state) => {
      const product = state.draft.products.find(
        (product) => product.id === productId,
      );

      if (!product) {
        return null;
      }

      return {
        name: product.name,
        category: product.category,
        subcategory: product.subcategory,
      };
    }),
  );

  const updateProductName = usePurchaseDraftStore(
    (state) => state.updateProductName,
  );

  const updateCategory = usePurchaseDraftStore((state) => state.updateCategory);

  const updateSubcategory = usePurchaseDraftStore(
    (state) => state.updateSubcategory,
  );

  const removeProduct = usePurchaseDraftStore((state) => state.removeProduct);

  if (!product) {
    return null;
  }

  const subcategories = getSubcategoriesByCategory(product.category);

  const fieldId = `product-${productIndex}`;

  const selectClassName =
    "h-12 w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 aria-invalid:border-destructive";

  const nameError = getValidationError(validationIssues, [
    "products",
    productIndex,
    "name",
  ]);

  const categoryError = getValidationError(validationIssues, [
    "products",
    productIndex,
    "category",
  ]);

  const subcategoryError = getValidationError(validationIssues, [
    "products",
    productIndex,
    "subcategory",
  ]);

  function changeCategory(categoryId: CategoryId) {
    updateCategory(productId, categoryId);

    onStructuralChange();
  }

  function changeSubcategory(subcategoryId: SubcategoryId) {
    updateSubcategory(productId, subcategoryId);

    onStructuralChange();
  }

  function handleRemove() {
    if (!canRemove) {
      return;
    }

    removeProduct(productId);

    onStructuralChange();
  }

  return (
    <article className="min-w-0 space-y-6 [&+article]:mt-8 [&+article]:border-t [&+article]:border-border [&+article]:pt-8">
      <header className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold">Product {productIndex + 1}</h2>

        <button
          type="button"
          disabled={!canRemove}
          onClick={handleRemove}
          aria-label={`Remove product ${productIndex + 1}`}
          title="Remove product"
          className="flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 className="size-4" />
        </button>
      </header>

      <div className="grid min-w-0 grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        {/* Product Name */}
        <Field
          className="min-w-0 sm:col-span-2 lg:col-span-1"
          data-invalid={Boolean(nameError)}
        >
          <FieldLabel htmlFor={`${fieldId}-name`}>Product name</FieldLabel>

          <Input
            id={`${fieldId}-name`}
            className="rounded-lg border border-input bg-background px-3 text-sm shadow-none"
            value={product.name}
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? `${fieldId}-name-error` : undefined}
            onChange={(event) =>
              updateProductName(productId, event.target.value)
            }
          />

          {nameError && (
            <FieldError id={`${fieldId}-name-error`}>{nameError}</FieldError>
          )}
        </Field>

        {/* Category */}
        <Field className="min-w-0" data-invalid={Boolean(categoryError)}>
          <FieldLabel htmlFor={`${fieldId}-category`}>Category</FieldLabel>

          <select
            id={`${fieldId}-category`}
            className={selectClassName}
            value={product.category}
            aria-invalid={Boolean(categoryError)}
            aria-describedby={
              categoryError ? `${fieldId}-category-error` : undefined
            }
            onChange={(event) =>
              changeCategory(event.target.value as CategoryId)
            }
          >
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {categoryError && (
            <FieldError id={`${fieldId}-category-error`}>
              {categoryError}
            </FieldError>
          )}
        </Field>

        {/* Subcategory */}
        <Field className="min-w-0" data-invalid={Boolean(subcategoryError)}>
          <FieldLabel htmlFor={`${fieldId}-subcategory`}>
            Subcategory
          </FieldLabel>

          <select
            id={`${fieldId}-subcategory`}
            className={selectClassName}
            value={product.subcategory}
            aria-invalid={Boolean(subcategoryError)}
            aria-describedby={
              subcategoryError ? `${fieldId}-subcategory-error` : undefined
            }
            onChange={(event) =>
              changeSubcategory(event.target.value as SubcategoryId)
            }
          >
            {subcategories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {subcategoryError && (
            <FieldError id={`${fieldId}-subcategory-error`}>
              {subcategoryError}
            </FieldError>
          )}
        </Field>
      </div>

      {/* Variants */}
      <section
        className="min-w-0 space-y-3"
        aria-labelledby={`${fieldId}-variants`}
      >
        <h3 id={`${fieldId}-variants`} className="text-sm font-semibold">
          Variants
        </h3>

        <Variants
          productId={productId}
          productIndex={productIndex}
          validationIssues={validationIssues}
          onStructuralChange={onStructuralChange}
        />
      </section>

      {/* Images */}
      <section
        className="min-w-0 border-t border-border pt-5"
        aria-label="Product images"
      >
        <Images productId={productId} />
      </section>
    </article>
  );
}
