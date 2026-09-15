import { categories, subcategories } from "./data";

export const subcategoryIds = subcategories.map(
  (subcategory) => subcategory.id,
);

export const variantAttributesBySubcategory = Object.fromEntries(
  subcategories.map((subcategory) => [
    subcategory.id,
    subcategory.variantAttributes,
  ]),
);

export function getCategoryOptions() {
  return categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
}

export function getSubcategoryOptions(categoryId: string) {
  return getSubcategoriesByCategory(categoryId).map((subcategory) => ({
    label: subcategory.name,
    value: subcategory.id,
  }));
}

export function getSubcategoriesByCategory(categoryId: string) {
  return subcategories.filter(
    (subcategory) => subcategory.categoryId === categoryId,
  );
}

export function getSubcategoryDetails(subcategoryId: string) {
  return subcategories.find((subcategory) => subcategory.id === subcategoryId);
}

export function flattenVariantAttributes(attributes: string[]) {
  const flattenValues = Object.fromEntries(
    attributes.map((attribute) => [attribute, ""]),
  );
  return {
    ...flattenValues,
    qty: 0,
    price: 0,
  };
}

export function getImagesGroupByAttributes(subcategoryId: string) {
  const subcategory = subcategories.find(
    (subcategory) => subcategory.id === subcategoryId,
  );
  return subcategory?.imageGroupBy;
}

export type SubcategoryIds = (typeof subcategories)[number]["id"];
