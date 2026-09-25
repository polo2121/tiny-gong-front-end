"use client";

import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { deriveImageGroups } from "../_derivations/image-grouping";
import { usePurchaseDraftStore } from "../_store/purchase-draft.store";
import { getImageGroupBy } from "../_taxonomy/product-taxonomy";

type ImagesProps = {
  productId: string;
};

type ImagePreviewProps = {
  file: File;
};

function ImagePreview({ file }: ImagePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!previewUrl) {
    return null;
  }

  return (
    <img
      src={previewUrl}
      alt="Selected product"
      className="h-24 w-24 rounded-md object-cover"
    />
  );
}

export function Images({ productId }: ImagesProps) {
  const product = usePurchaseDraftStore(
    useShallow((state) => {
      const product = state.draft.products.find(
        (product) => product.id === productId,
      );

      if (!product) {
        return null;
      }

      return {
        subcategory: product.subcategory,
        variants: product.variants,
        imageAssignments: product.imageAssignments,
      };
    }),
  );

  const setImageAssignment = usePurchaseDraftStore(
    (state) => state.setImageAssignment,
  );

  const removeImageAssignment = usePurchaseDraftStore(
    (state) => state.removeImageAssignment,
  );

  const imageGroups = useMemo(() => {
    if (!product) {
      return [];
    }

    const imageGroupBy = getImageGroupBy(product.subcategory);

    return deriveImageGroups(product.variants, imageGroupBy);
  }, [product?.subcategory, product?.variants]);

  if (!product) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h3 className="font-medium">Product Images</h3>

      {imageGroups.map((group) => {
        const assignment = product.imageAssignments.find(
          (assignment) => assignment.groupKey === group.groupKey,
        );

        return (
          <div key={group.groupKey} className="flex items-center gap-4">
            {/* Group information */}
            <div className="min-w-40">
              {Object.entries(group.attributes).map(([attribute, value]) => (
                <div key={attribute} className="text-sm">
                  <span className="font-medium">{attribute}:</span>{" "}
                  {value || "—"}
                </div>
              ))}
            </div>

            {/* Image selector */}
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (!file) {
                  return;
                }

                setImageAssignment(productId, group.groupKey, file);

                // Allows selecting the same
                // file again later.
                event.target.value = "";
              }}
            />

            {/* Current image */}
            {assignment && (
              <div className="flex items-center gap-3">
                <ImagePreview file={assignment.file} />

                <button
                  type="button"
                  onClick={() =>
                    removeImageAssignment(productId, group.groupKey)
                  }
                  className="text-sm"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        );
      })}

      {imageGroups.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No image groups available.
        </p>
      )}
    </section>
  );
}
