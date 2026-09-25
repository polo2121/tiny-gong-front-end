import type { PurchaseDraft } from "../_schema/purchase-draft.schema";
import { deriveImageGroups } from "../_derivations/image-grouping";
import {
  getImageGroupBy,
  type VariantAttribute,
} from "../_taxonomy/product-taxonomy";

export type PreparedPurchaseImage = {
  productId: string;
  groupKey: string;
  attributes: Partial<Record<VariantAttribute, string>>;
  variantIds: string[];
  file: File;
};

export function preparePurchaseImages(
  draft: PurchaseDraft,
): PreparedPurchaseImage[] {
  return draft.products.flatMap((product) => {
    const groupBy = getImageGroupBy(product.subcategory);
    const groups = deriveImageGroups(product.variants, groupBy);

    const assignments = new Map(
      product.imageAssignments.map((assignment) => [
        assignment.groupKey,
        assignment.file,
      ]),
    );

    return groups.flatMap((group) => {
      const file = assignments.get(group.groupKey);
      if (!file) return [];

      return [
        {
          productId: product.id,
          groupKey: group.groupKey,
          attributes: group.attributes,
          variantIds: group.variantIds,
          file,
        },
      ];
    });
  });
}
