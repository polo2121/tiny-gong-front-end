import type { CreatePurchasePayload } from "../submit/purchase-payload";

export async function createPurchase(payload: CreatePurchasePayload) {
  const response = await fetch("/api/purchases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create purchase");
  }

  return response.json();
}
