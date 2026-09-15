export const categories = [
  { id: "clothing", name: "Clothing" },
  { id: "footwear", name: "Footwear" },
  { id: "accessories", name: "Accessories" },
  { id: "baby-care", name: "Baby Care" },
  { id: "feeding-nursing", name: "Feeding & Nursing" },
  { id: "toys-games", name: "Toys & Games" },
  { id: "school-books-stationery", name: "School, Books & Stationery" },
  { id: "sports-outdoor", name: "Sports & Outdoor" },
  { id: "baby-gear-safety", name: "Baby Gear & Safety" },
  { id: "nursery-furniture-home", name: "Nursery, Furniture & Home" },
  { id: "electronics", name: "Electronics" },
  { id: "food-snacks", name: "Food & Snacks" },
] as const;

export const subcategories = [
  {
    id: "t-shirts",
    name: "T-Shirts",
    categoryId: "clothing",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },
  {
    id: "underwear",
    name: "Underwear",
    categoryId: "clothing",
    variantAttributes: ["color", "size", "packSize"],
    imageGroupBy: ["color", "packSize"],
  },
  {
    id: "sneakers",
    name: "Sneakers",
    categoryId: "footwear",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },
  {
    id: "bags",
    name: "Bags",
    categoryId: "accessories",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },
  {
    id: "baby-lotion",
    name: "Baby Lotion",
    categoryId: "baby-care",
    variantAttributes: ["size"],
    imageGroupBy: ["size"],
  },
  {
    id: "baby-bottles",
    name: "Baby Bottles",
    categoryId: "feeding-nursing",
    variantAttributes: ["size", "color"],
    imageGroupBy: ["color"],
  },
  {
    id: "building-blocks",
    name: "Building Blocks",
    categoryId: "toys-games",
    variantAttributes: ["model", "color"],
    imageGroupBy: ["model", "color"],
  },
  {
    id: "notebooks",
    name: "Notebooks",
    categoryId: "school-books-stationery",
    variantAttributes: ["size", "color"],
    imageGroupBy: ["color"],
  },
  {
    id: "sports-bottles",
    name: "Sports Bottles",
    categoryId: "sports-outdoor",
    variantAttributes: ["size", "color"],
    imageGroupBy: ["color"],
  },
  {
    id: "baby-gates",
    name: "Baby Gates",
    categoryId: "baby-gear-safety",
    variantAttributes: ["size", "color"],
    imageGroupBy: ["color"],
  },
  {
    id: "cribs",
    name: "Cribs",
    categoryId: "nursery-furniture-home",
    variantAttributes: ["size", "color"],
    imageGroupBy: ["color"],
  },
  {
    id: "tablets",
    name: "Tablets",
    categoryId: "electronics",
    variantAttributes: ["model", "storage", "color"],
    imageGroupBy: ["model", "color"],
  },
  {
    id: "snacks",
    name: "Snacks",
    categoryId: "food-snacks",
    variantAttributes: ["flavor", "weight"],
    imageGroupBy: ["flavor", "weight"],
  },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
export type SubcategoryId = (typeof subcategories)[number]["id"];
export type VariantAttribute =
  (typeof subcategories)[number]["variantAttributes"][number];

export function getSubcategory(subcategoryId: SubcategoryId) {
  return subcategories.find((subcategory) => subcategory.id === subcategoryId);
}

export function getSubcategoriesByCategory(categoryId: CategoryId) {
  return subcategories.filter((subcategory) => subcategory.categoryId === categoryId);
}

export function getVariantAttributes(subcategoryId: SubcategoryId) : readonly VariantAttribute[] {
  return getSubcategory(subcategoryId)?.variantAttributes ?? [];
}

export function getImageGroupBy(subcategoryId: SubcategoryId) {
  return getSubcategory(subcategoryId)?.imageGroupBy ?? [];
}
