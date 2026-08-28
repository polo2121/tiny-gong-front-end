import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PackageAddIcon,
  ShoppingBagRemoveIcon,
} from "@hugeicons/core-free-icons";

type NoProductsStateProps = {
  onCreate: () => void;
};

export function NoProductsState({ onCreate }: NoProductsStateProps) {
  return (
    <EmptyState
      icon={
        <HugeiconsIcon
          icon={ShoppingBagRemoveIcon}
          className="size-6"
          strokeWidth={2.2}
        />
      }
      title="No Products Registered."
      subTitle="(ကုန်ပစ္စည်းမထည့်ရသေးပါ)"
      description="Start adding products and variants for this purchase when you are ready."
      action={
        <Button className="w-full" size="default" onClick={onCreate}>
          <HugeiconsIcon icon={PackageAddIcon} strokeWidth={2.2} />
          Create Product Now
        </Button>
      }
      goBackLink="/purchase"
    />
  );
}
