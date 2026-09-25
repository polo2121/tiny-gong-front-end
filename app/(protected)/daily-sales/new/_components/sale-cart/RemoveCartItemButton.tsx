"use client";

import { ShoppingCartRemoveIcon } from "@/components/icons/ShoppingCartRemoveIcon";
import { Button } from "@/components/ui/button";

import { useSaleDraftStore } from "../../_stores/use-sale-draft-store";

type RemoveCartItemButtonProps = {
  itemName: string;
  itemSku: string;
};

export function RemoveCartItemButton({
  itemName,
  itemSku,
}: RemoveCartItemButtonProps) {
  const removeItem = useSaleDraftStore((state) => state.removeItem);

  return (
    <Button
      variant="ghost"
      aria-label={`Remove ${itemName}`}
      className="flex size-9 shrink-0 items-center justify-center text-pink-700 transition hover:-translate-y-0.5 "
      onClick={() => removeItem(itemSku)}
    >
      <ShoppingCartRemoveIcon className="size-5" />
    </Button>
  );
}
