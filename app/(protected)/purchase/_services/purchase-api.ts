import { z } from "zod";

import { apiRequest } from "@/lib/api/api.request";
import { getErrorMessage } from "@/lib/errors/get-error-message";
import { normalizeError } from "@/lib/errors/normalize-error";
import type { PurchaseRecord } from "../_types/purchase";
import type { PurchaseFormValues } from "../_schemas/purchase-schema";

const purchaseApiBaseUrl =
  process.env.NEXT_PUBLIC_PURCHASE_API_URL ?? "http://localhost:8787/purchases";

const registeredProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.literal("clothing"),
  seriesCode: z.string(),
  sellPrice: z.number(),
  purchasePrice: z.number(),
  expectedVariants: z.number(),
  registeredVariantIds: z.array(z.string()),
});

const purchaseRecordSchema = z.object({
  id: z.string(),
  supplier: z.string(),
  expectedProducts: z.number(),
  registeredProducts: z.array(registeredProductSchema),
  date: z.string(),
  totalPrice: z.number(),
  note: z.string().nullable().optional(),
});

const purchaseListDataSchema = z.object({
  purchases: z.array(purchaseRecordSchema),
});

const purchaseDataSchema = z.object({
  purchase: purchaseRecordSchema,
});

export async function fetchPurchaseList(): Promise<PurchaseRecord[]> {
  const data = await apiRequest({
    url: purchaseApiBaseUrl,
    schema: purchaseListDataSchema,
  });

  return data.purchases;
}

export async function getPurchasePageData(): Promise<{
  purchases: PurchaseRecord[];
  error: string | null;
}> {
  try {
    const purchases = await fetchPurchaseList();

    return {
      purchases,
      error: null,
    };
  } catch (error) {
    const appError = normalizeError(error);

    return {
      purchases: [],
      error: getErrorMessage(appError.code),
    };
  }
}

export async function fetchPurchaseDetails(
  purchaseId: string,
): Promise<PurchaseRecord | null> {
  const purchases = await fetchPurchaseList();

  return purchases.find((purchase) => purchase.id === purchaseId) ?? null;
}

export async function createPurchase(
  input: PurchaseFormValues,
): Promise<PurchaseRecord> {
  const data = await apiRequest({
    url: purchaseApiBaseUrl,
    method: "POST",
    body: input,
    schema: purchaseDataSchema,
  });

  return data.purchase;
}

export async function updatePurchase({
  purchaseId,
  input,
}: {
  purchaseId: string;
  input: PurchaseFormValues;
}): Promise<PurchaseRecord> {
  const data = await apiRequest({
    url: `${purchaseApiBaseUrl}/${purchaseId}`,
    method: "PATCH",
    body: input,
    schema: purchaseDataSchema,
  });

  return data.purchase;
}

export async function deletePurchase(purchaseId: string): Promise<void> {
  await apiRequest({
    url: `${purchaseApiBaseUrl}/${purchaseId}`,
    method: "DELETE",
  });
}
