import type { PreparedPurchaseImage } from "../submit/prepare-purchase-images";

export type UploadedPurchaseImage = {
  productId: string;
  groupKey: string;
  attributes: PreparedPurchaseImage["attributes"];
  variantIds: string[];
  image: {
    id: string;
    fileName: string;
    url: string;
  };
};

export async function uploadPurchaseImages(
  images: PreparedPurchaseImage[],
): Promise<UploadedPurchaseImage[]> {
  return Promise.all(
    images.map(async (item) => {
      const formData = new FormData();
      formData.append("file", item.file);

      const response = await fetch("/api/uploads/images", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload purchase image");
      }

      const uploaded = (await response.json()) as {
        id: string;
        fileName: string;
        url: string;
      };

      return {
        productId: item.productId,
        groupKey: item.groupKey,
        attributes: item.attributes,
        variantIds: item.variantIds,
        image: uploaded,
      };
    }),
  );
}
