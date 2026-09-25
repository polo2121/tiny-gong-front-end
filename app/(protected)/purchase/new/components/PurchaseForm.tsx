"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
  createEmptyProduct,
  createInitialPurchaseDraft,
} from "../_factory/purchase-draft.factory";
import type { PurchaseDraft } from "../_schema/purchase-draft.schema";
import { usePurchaseDraftStore } from "../_store/purchase-draft.store";
import { purchaseSubmitSchema } from "../_schema/purchase-submit.schema";
import { useSubmitPurchase } from "../_submit/use-submit-purchase";
import { Product } from "../_components/Product";

type PurchaseFormProps = {
  initialValues?: PurchaseDraft;
};

export function PurchaseForm({ initialValues }: PurchaseFormProps) {
  const storedDraft = usePurchaseDraftStore((state) => state.draft);
  const replaceDraft = usePurchaseDraftStore((state) => state.replaceDraft);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PurchaseDraft>({
    resolver: zodResolver(purchaseSubmitSchema),
    mode: "onSubmit",
    defaultValues: initialValues ?? storedDraft ?? createInitialPurchaseDraft(),
  });

  const {
    fields: products,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: "products",
    keyName: "fieldId",
  });

  const submitPurchase = useSubmitPurchase();

  function saveSnapshot() {
    replaceDraft(getValues());
  }

  function onSubmit(values: PurchaseDraft) {
    // Keep the validated form as the latest deliberate draft snapshot.
    replaceDraft(values);
    submitPurchase.mutate(values, {
      onSuccess: () => {
        reset(createInitialPurchaseDraft());
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
        <label>
          Purchase date
          <input type="date" {...register("purchaseDate")} />
          <small>{errors.purchaseDate?.message}</small>
        </label>

        <label>
          Supplier ID
          <input {...register("supplierId")} />
          <small>{errors.supplierId?.message}</small>
        </label>
      </div>

      <div style={{ marginTop: 20 }}>
        {products.map((product, productIndex) => (
          <Product
            key={product.fieldId}
            productIndex={productIndex}
            register={register}
            control={control}
            getValues={getValues}
            setValue={setValue}
            errors={errors}
            canRemove={products.length > 1}
            onRemove={() => {
              if (products.length > 1) removeProduct(productIndex);
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={() => appendProduct(createEmptyProduct())}
        >
          Add Product
        </button>

        <button type="button" onClick={saveSnapshot}>
          Save Draft Snapshot
        </button>

        <button type="submit" disabled={submitPurchase.isPending}>
          {submitPurchase.isPending ? "Saving..." : "Save Purchase"}
        </button>
      </div>

      {submitPurchase.isError && (
        <p role="alert">
          {submitPurchase.error instanceof Error
            ? submitPurchase.error.message
            : "Failed to save purchase"}
        </p>
      )}
    </form>
  );
}
