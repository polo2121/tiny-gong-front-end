import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors/get-error-message";
import {
  createPurchase,
  deletePurchase,
  fetchPurchaseList,
  updatePurchase,
} from "../_services/purchase-api";
import { PurchaseRecord } from "../prev-new/schema/new-purchase-schema";
import { notify } from "@/lib/notify";
import { PurchaseRecordFilters }  from "../_schemas/purchase-records-filters-schema"


export const purchasesQueryKey = ["purchases"] as const;

type UsePurchasesOptions = {
  initialPurchaseRecords: PurchaseRecord[];
  filters: PurchaseRecordFilters;
};

export function usePurchaseRecords({
  initialPurchaseRecords,
  filters,
}: UsePurchasesOptions) {
  const {search, status } = filters;
  const shouldUseInitialPurchases = !search.trim() && status === "all";

  const query = useQuery({
    queryKey: [...purchasesQueryKey, { search, status }],
    queryFn: () =>
      fetchPurchaseList({ search, status }),
    initialData: shouldUseInitialPurchases ? initialPurchaseRecords : undefined,
    placeholderData: (previousPurchases) => previousPurchases,
  });
  return {
    ...query,
    errorMessage: query.error ? getErrorMessage(query.error) : "",
  };
}

export function useCreatePurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPurchase,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: purchasesQueryKey });
      notify.success({
        title: "Purchase created",
        description: "The purchase has been created successfully.",
      });
    },
  });
}

export function useUpdatePurchase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePurchase,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: purchasesQueryKey });
      toast.success("Purchase updated successfully.");
    },
  });
}

export function useDeletePurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePurchase,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: purchasesQueryKey });
      toast.success("Purchase removed successfully.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
