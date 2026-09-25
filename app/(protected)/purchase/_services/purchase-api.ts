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
  purchaseStatsApiResponseSchema,
  type PurchaseStats,
} from "../_schemas/purchase-stats-schema";
import type { DashboardPeriod } from "@/components/stats/types";
import type { CustomDateFilterValue } from "@/components/filters/CustomDateFilter";

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

export async function fetchPurchaseStats({
  period,
  customDate,
}: {
  period: DashboardPeriod;
  customDate: CustomDateFilterValue | null;
}): Promise<PurchaseStats> {
  const url = new URL(`${purchaseApiBaseUrl}/stats`);

  if (customDate) {
    url.searchParams.set("from", customDate.from);
    url.searchParams.set("to", customDate.to);
  } else {
    url.searchParams.set("period", period);
  }

  const data = await apiRequest({
    url: url.toString(),
    schema: purchaseStatsApiResponseSchema,
  });

  return data.stats;
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
