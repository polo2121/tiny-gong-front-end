import { z } from "zod";

export const productCategorySchema = z.enum([
  "clothing",
  "books",
  "toys",
]);

export const variantSchema = z.object({
  id: z.string(),
  name: z.string(),
  size: z.string(),
  color: z.string(),
  quantity: z.number(),
});

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  seriesCode: z.string(),
  category: productCategorySchema,
  sellPrice: z.number(),
  purchasePrice: z.number(),
  expectedVariants: z.number(),
  variants: z.array(variantSchema),
});

export const productFormSchema = z.object({
  name: z.string().trim().min(1, "Product name is required."),
  category: productCategorySchema,
  sellPrice: z
    .number({ error: "Sell price is required." })
    .positive("Sell price must be greater than 0."),
  purchasePrice: z
    .number({ error: "Purchase price is required." })
    .positive("Purchase price must be greater than 0."),
  expectedVariants: z
    .number({ error: "Expected variants is required." })
    .int("Expected variants must be a whole number.")
    .min(1, "Expected variants must be at least 1."),
});

export const variantFormSchema = z.object({
  name: z.string().trim().min(1, "Variant name is required."),
  size: z.string().trim().min(1, "Size is required."),
  color: z.string().trim().min(1, "Color is required."),
  quantity: z
    .number({ error: "Quantity is required." })
    .int("Quantity must be a whole number.")
    .min(1, "Quantity must be at least 1."),
});

export type ProductCategory = z.infer<typeof productCategorySchema>;

export type Product = z.infer<typeof productSchema>;

export type Variant = z.infer<typeof variantSchema>;

export type ProductFormValues = z.infer<typeof productFormSchema>;

export type VariantFormValues = z.infer<typeof variantFormSchema>;
