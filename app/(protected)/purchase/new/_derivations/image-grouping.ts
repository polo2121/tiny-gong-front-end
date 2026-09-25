import type { VariantDraft } from "../_schema/purchase-draft.schema";
import type { VariantAttribute } from "../_taxonomy/product-taxonomy";

export type DerivedImageGroup = {
  groupKey: string;
  attributes: Partial<Record<VariantAttribute, string>>;
  variantIds: string[];
};

function createGroupKey(
  attributes: Partial<Record<VariantAttribute, string>>,
  groupBy: readonly VariantAttribute[],
) {
  return groupBy
    .map((attribute) => `${attribute}=${attributes[attribute] ?? ""}`)
    .join("|");
}

export function deriveImageGroups(
  variants: VariantDraft[],
  groupBy: readonly VariantAttribute[],
): DerivedImageGroup[] {
  const groups = new Map<string, DerivedImageGroup>();

  for (const variant of variants) {
    const attributes = Object.fromEntries(
      groupBy.map((attribute) => [attribute, variant.attributes[attribute] ?? ""]),
    ) as Partial<Record<VariantAttribute, string>>;

    const groupKey = createGroupKey(attributes, groupBy);
    const existing = groups.get(groupKey);

    if (existing) {
      existing.variantIds.push(variant.id);
      continue;
    }

    groups.set(groupKey, {
      groupKey,
      attributes,
      variantIds: [variant.id],
    });
  }

  return Array.from(groups.values());
}
