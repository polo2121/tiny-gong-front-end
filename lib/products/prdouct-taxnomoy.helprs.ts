import { categories, subcategories } from "./product-taxonomy";


export function getSubcategoriesByCategory(categoryId: string) {
  return subcategories.filter(
    (subcategory) => subcategory.categoryId === categoryId,
  );
}


export function getProductSubcategory(subcategoryId: string) {
  return subcategories.find(
    (subcategory) => subcategory.id === subcategoryId,
  );
}