import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors/get-error-message";
import { normalizeError } from "@/lib/errors/normalize-error";
import {
  createPurchase,
  deletePurchase,
  fetchPurchaseList,
  updatePurchase,
} from "../_services/purchase-api";
import type { PurchaseRecord } from "../_types/purchase";

export const purchasesQueryKey = ["purchases"] as const;

export function usePurchases(initialPurchases?: PurchaseRecord[]) {
  return useQuery({
    queryKey: purchasesQueryKey,
    queryFn: fetchPurchaseList,
    initialData: initialPurchases,
  });
}

export function useCreatePurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPurchase,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: purchasesQueryKey });
      toast.success("Purchase saved successfully.");
    },
  });
}

export function useUpdatePurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePurchase,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: purchasesQueryKey });
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
      const appError = normalizeError(error);

      toast.error(getErrorMessage(appError.code));
    },
  });
}
