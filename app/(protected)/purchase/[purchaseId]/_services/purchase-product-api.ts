import { apiRequest } from "@/lib/api/api.request";

const purchaseApiBaseUrl =
  process.env.NEXT_PUBLIC_PURCHASE_API_URL ?? "http://localhost:8787/purchases";

export async function createPurchaseProduct({
  purchaseId,
  input,
}: {
  purchaseId: string;
  input: unknown;
}) {
  // Backend trace: POST /purchases/:purchaseId/products
  return apiRequest({
    url: `${purchaseApiBaseUrl}/${purchaseId}/products`,
    method: "POST",
    body: input,
  });
}

export async function updatePurchaseProduct({
  purchaseId,
  productId,
  input,
}: {
  purchaseId: string;
  productId: string;
  input: unknown;
}) {
  // Backend trace: PATCH /purchases/:purchaseId/products/:productId
  return apiRequest({
    url: `${purchaseApiBaseUrl}/${purchaseId}/products/${productId}`,
    method: "PATCH",
    body: input,
  });
}

export async function deletePurchaseProduct({
  purchaseId,
  productId,
}: {
  purchaseId: string;
  productId: string;
}) {
  // Backend trace: DELETE /purchases/:purchaseId/products/:productId
  return apiRequest({
    url: `${purchaseApiBaseUrl}/${purchaseId}/products/${productId}`,
    method: "DELETE",
  });
}
