"use client";

import { useEffect, useRef, useState } from "react";
import type { ZodError } from "zod";
import { useShallow } from "zustand/react/shallow";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { createInitialPurchaseDraft } from "../_factory/purchase-draft.factory";
import type { PurchaseDraft } from "../_schema/purchase-draft.schema";
import { usePurchaseDraftStore } from "../_store/purchase-draft.store";
import { purchaseSubmitSchema } from "../_submit/purchase-submit.schema";
import { useSubmitPurchase } from "../_submit/use-submit-purchase";

import { Product } from "./Product";
import { getValidationError } from "../_validation/validation-errors";

type PurchaseEditorProps = {
  initialValues?: PurchaseDraft;
};

type ValidationIssues = ZodError["issues"];

export function PurchaseEditor({ initialValues }: PurchaseEditorProps) {
  const [validationIssues, setValidationIssues] = useState<ValidationIssues>(
    [],
  );

  const initialized = useRef(false);

  const purchaseDate = usePurchaseDraftStore(
    (state) => state.draft.purchaseDate,
  );

  const supplierId = usePurchaseDraftStore((state) => state.draft.supplierId);

  const productIds = usePurchaseDraftStore(
    useShallow((state) => state.draft.products.map((product) => product.id)),
  );

  const setPurchaseDate = usePurchaseDraftStore(
    (state) => state.setPurchaseDate,
  );

  const setSupplier = usePurchaseDraftStore((state) => state.setSupplier);

  const addProduct = usePurchaseDraftStore((state) => state.addProduct);

  const replaceDraft = usePurchaseDraftStore((state) => state.replaceDraft);

  const resetDraft = usePurchaseDraftStore((state) => state.resetDraft);

  const submitPurchase = useSubmitPurchase();

  /*
   * Apply initial values once.
   *
   * Useful when editing/loading
   * an existing purchase.
   */
  useEffect(() => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    if (initialValues) {
      replaceDraft(initialValues);
    }
  }, [initialValues, replaceDraft]);

  const purchaseDateError = getValidationError(validationIssues, [
    "purchaseDate",
  ]);

  const supplierError = getValidationError(validationIssues, ["supplierId"]);

  function clearValidationIssues() {
    setValidationIssues([]);
  }

  function handleAddProduct() {
    addProduct();

    // Product indexes changed.
    clearValidationIssues();
  }

  function handleSave() {
    /*
     * Read the latest draft directly
     * from Zustand.
     *
     * This avoids subscribing this whole
     * component to the entire draft.
     */
    const draft = usePurchaseDraftStore.getState().draft;
    const result = purchaseSubmitSchema.safeParse(draft);

    if (!result.success) {
      setValidationIssues(result.error.issues);

      return;
    }

    setValidationIssues([]);

    submitPurchase.mutate(result.data, {
      onSuccess: () => {
        resetDraft();
        setValidationIssues([]);
      },
    });
  }

  return (
    <div className="bg-slate-100">
      {/* Purchase Information */}
      <div>
        <Field data-invalid={Boolean(purchaseDateError)}>
          <FieldLabel htmlFor="purchaseDate">Purchase date</FieldLabel>

          <Input
            id="purchaseDate"
            type="date"
            value={purchaseDate}
            aria-invalid={Boolean(purchaseDateError)}
            className={cn(purchaseDateError && "ring-2 ring-pink-700/30")}
            onChange={(event) => setPurchaseDate(event.target.value)}
          />

          {purchaseDateError && <FieldError>{purchaseDateError}</FieldError>}
        </Field>

        <Field data-invalid={Boolean(supplierError)}>
          <FieldLabel htmlFor="supplierId">Supplier ID</FieldLabel>

          <Input
            id="supplierId"
            type="text"
            autoComplete="off"
            value={supplierId}
            aria-invalid={Boolean(supplierError)}
            className={cn(supplierError && "ring-2 ring-pink-700/30")}
            onChange={(event) => setSupplier(event.target.value)}
          />

          {supplierError && <FieldError>{supplierError}</FieldError>}
        </Field>
      </div>

      {/* Products */}
      <div
        style={{ marginTop: 20 }}
        className="m-auto rounded-lg border border-dashed border-slate-200 bg-white/90 px-6 py-10 shadow-lg lg:max-w-4xl xl:max-w-5xl"
      >
        {productIds.map((productId, productIndex) => (
          <Product
            key={productId}
            productId={productId}
            productIndex={productIndex}
            canRemove={productIds.length > 1}
            validationIssues={validationIssues}
            onStructuralChange={clearValidationIssues}
          />
        ))}
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          gap: 8,
        }}
      >
        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>

        <button
          type="button"
          disabled={submitPurchase.isPending}
          onClick={handleSave}
        >
          {submitPurchase.isPending ? "Saving..." : "Save Purchase"}
        </button>
      </div>

      {/* API Error */}
      {submitPurchase.isError && (
        <p role="alert">
          {submitPurchase.error instanceof Error
            ? submitPurchase.error.message
            : "Failed to save purchase"}
        </p>
      )}
    </div>
  );
}
