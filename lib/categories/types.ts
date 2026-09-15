import { categories, subcategories } from "./data";

export type CategoryId =
  (typeof categories)[number]["id"];

export type SubcategoryId =
  (typeof subcategories)[number]["id"];

export type VariantAttribute =
  (typeof subcategories)[number]["variantAttributes"][number];

export type ImageGroupAttribute =
  (typeof subcategories)[number]["imageGroupBy"][number];