import type { ImageGroup, VariantDraft } from "./new-purchase-schema";

export function getImageGroups(
  variants: VariantDraft[],
  imagesGroupByAttributes: string[],
): ImageGroup[] {
  const groups = new Map<string, ImageGroup>();

  for (const variant of variants) {
    const group = Object.fromEntries(
      imagesGroupByAttributes.map((attribute) => [
        attribute,
        variant.attributes?.[attribute] ?? "",
      ]),
    );

    const key = JSON.stringify(group);
    const existingGroup = groups.get(key);

    if (existingGroup) {
      existingGroup.variantIds.push(variant.id);
      continue;
    }

    groups.set(key, {
      group,
      variantIds: [variant.id],
      image: null,
    });
  }

  return Array.from(groups.values());
}
