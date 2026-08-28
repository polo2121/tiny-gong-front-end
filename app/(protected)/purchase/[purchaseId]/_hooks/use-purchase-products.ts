import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { purchasesQueryKey } from "../../_hooks/use-purchases";
import {
  createPurchaseProduct,
  deletePurchaseProduct,
  updatePurchaseProduct,
} from "../_services/purchase-product-api";

export function useCreatePurchaseProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPurchaseProduct,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: purchasesQueryKey });
      toast.success("Product created successfully.");
    },
  });
}

export function useUpdatePurchaseProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePurchaseProduct,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: purchasesQueryKey });
      toast.success("Product updated successfully.");
    },
  });
}

export function useDeletePurchaseProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePurchaseProduct,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: purchasesQueryKey });
      toast.success("Product removed successfully.");
    },
  });
}
