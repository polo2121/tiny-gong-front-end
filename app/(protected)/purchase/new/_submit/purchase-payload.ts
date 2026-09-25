import type { UploadedPurchaseImage } from "../api/upload-purchase-images";
import type { PurchaseDraft } from "../_schema/purchase-draft.schema";
import type {
  CategoryId,
  SubcategoryId,
} from "../_taxonomy/product-taxonomy";

export type CreatePurchasePayload = {
  purchaseDate: string;
  supplierId: string;
  products: Array<{
    name: string;
    category: CategoryId;
    subcategory: SubcategoryId;
    variants: Array<{
      attributes: Record<string, string>;
      qty: number;
      unitPrice: number;
    }>;
    imageGroups: Array<{
      attributes: Record<string, string>;
      image: {
        id: string;
        fileName: string;
        url: string;
      };
    }>;
  }>;
};

export function buildPurchasePayload(
  draft: PurchaseDraft,
  uploadedImages: UploadedPurchaseImage[],
): CreatePurchasePayload {
  return {
    purchaseDate: draft.purchaseDate,
    supplierId: draft.supplierId,
    products: draft.products.map((product) => {
      const productImages = uploadedImages.filter(
        (image) => image.productId === product.id,
      );

      return {
        name: product.name,
        category: product.category,
        subcategory: product.subcategory,
        variants: product.variants.map((variant) => ({
          attributes: variant.attributes,
          qty: variant.qty,
          unitPrice: variant.unitPrice,
        })),
        imageGroups: productImages.map((item) => ({
          attributes: item.attributes,
          image: item.image,
        })),
      };
    }),
  };
}
