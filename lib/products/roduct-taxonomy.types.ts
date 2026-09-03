import { categories, subcategories } from "./product-taxonomy";

export type ProductCategoryId =
  (typeof categories)[number]["id"];

export type ProductSubcategoryId =
  (typeof subcategories)[number]["id"];

export type ProductVariantAttribute =
  (typeof subcategories)[number]["variantAttributes"][number];

export type ProductImageGroupAttribute =
  (typeof subcategories)[number]["imageGroupBy"][number];