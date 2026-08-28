import { apiRequest } from "@/lib/api/api.request";
import { getErrorMessage } from "@/lib/errors/get-error-message";

import {
  purchaseRecordSchema,
  purchaseRecordApiResponseSchema,
  PurchaseRecord,
  PurchaseRecordFormValues,
} from "../_schemas/purchase-schema";
import { PurchaseRecordFilters } from "../_schemas/purchase-records-filters-schema";
import {
  PurchaseDetails,
  purchaseDetailsApiResponseSchema,
} from "../[purchaseId]/_schemas/purchase-detail-schema";

const purchaseApiBaseUrl =
  process.env.NEXT_PUBLIC_PURCHASE_API_URL ?? "http://localhost:8787/purchases";

// type FetchPurchaseListOptions = {
//   searchQuery?: string;
//   statusFilter?: PurchaseStatusFilter;
// };

export async function getPurchaseListPageData(
  fitlers: PurchaseRecordFilters,
): Promise<{
  purchaseRecords: PurchaseRecord[];
  error: string | null;
}> {
  try {
    const purchaseRecords = await fetchPurchaseList(fitlers);

    return {
      purchaseRecords,
      error: null,
    };
  } catch (error) {
    return {
      purchaseRecords: [],
      error: getErrorMessage(error),
    };
  }
}

export async function getPurchaseDetailsByIdPageData(id: string): Promise<{
  purchaseDetails: PurchaseDetails | null;
  error: string | null;
}> {
  try {
    const purchaseDetails = await fetchPurchaseById(id);

    return {
      purchaseDetails,
      error: null,
    };
  } catch (error) {
    return {
      purchaseDetails: null,
      error: getErrorMessage(error),
    };
  }
}

export async function fetchPurchaseList({
  search = "",
  status = "all",
}: PurchaseRecordFilters): Promise<PurchaseRecord[]> {
  const url = new URL(purchaseApiBaseUrl);
  const normalizedQuery = search.trim();

  // Backend trace: when purchase search is ready, the backend should read this
  // query param and return the already-filtered purchase list.
  if (normalizedQuery) url.searchParams.set("search", normalizedQuery);
  else url.searchParams.set("search", "");

  // Backend trace: when purchase status filtering is ready, the backend should
  // treat "complete" as registeredProducts.length === expectedProducts and
  // "incomplete" as registeredProducts.length < expectedProducts.
  if (status !== "all") {
    url.searchParams.set("status", status);
  }

  const data = await apiRequest({
    url: url.toString(),
    schema: purchaseRecordApiResponseSchema,
  });
  return data.purchaseRecords;
}

export async function fetchPurchaseById(
  purchaseId: string,
): Promise<PurchaseDetails | null> {
  const data = await apiRequest({
    url: `${purchaseApiBaseUrl}/${purchaseId}`,
    schema: purchaseDetailsApiResponseSchema,
  });

  return data.purchaseDetails;
}

export async function createPurchase(input: PurchaseRecordFormValues) {
  await apiRequest({
    url: purchaseApiBaseUrl,
    method: "POST",
    body: input,
  });
}

export async function updatePurchase({
  id,
  input,
}: {
  id: string;
  input: PurchaseRecordFormValues;
}): Promise<void> {
  await apiRequest({
    url: `${purchaseApiBaseUrl}/${id}`,
    method: "PATCH",
    body: input,
  });
}

export async function deletePurchase(purchaseId: string): Promise<void> {
  await apiRequest({
    url: `${purchaseApiBaseUrl}/${purchaseId}`,
    method: "DELETE",
  });
}
