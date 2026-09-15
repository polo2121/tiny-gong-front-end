import { productDraftSchema, productImageSchema, variantDraftSchema } from "../../purchase/prev-new/schema/new-purchase-schema";
export { productImageSchema as proposedImageSchema, imageGroupSchema as proposedGroupSchema, productDraftSchema as proposedProductSchema, purchaseDraftSchema as proposedPurchaseSchema } from "../../purchase/prev-new/schema/new-purchase-schema";

export const schemas = { product: productDraftSchema, variant: variantDraftSchema, image: productImageSchema };
export type NodeId = "purchase" | "product" | "variant" | "group" | "image";
export const nodes: { id: NodeId; label: string; path: string; description: string }[] = [
  { id: "purchase", label: "Purchase", path: "draft", description: "One purchase owns the supplier, date, and list of products." },
  { id: "product", label: "Product", path: "draft.products[0]", description: "A product owns its variants and images. A purchase can contain many products." },
  { id: "variant", label: "Variant", path: "draft.products[0].variants[0]", description: "A sellable combination of attributes, with its own quantity and unit price." },
  { id: "group", label: "Image group", path: "draft.products[0].imageGroups[0]", description: "A unique color groups variant IDs that share images. IDs reference variants; they do not duplicate them." },
  { id: "image", label: "Image", path: "draft.products[0].images[0]", description: "An image record describes a file. Selecting a file and storing its record are separate operations." },
];
export const initialVariants = [
  { id: "v1", attributes: { color: "red", size: "S" }, qty: 2, unitPrice: 5 },
  { id: "v2", attributes: { color: "red", size: "M" }, qty: 3, unitPrice: 5 },
  { id: "v3", attributes: { color: "blue", size: "S" }, qty: 1, unitPrice: 5 },
];
