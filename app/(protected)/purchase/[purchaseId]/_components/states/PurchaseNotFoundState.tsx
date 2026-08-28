import { EmptyState } from "@/components/EmptyState";
import { DocumentNotFoundIcon } from "@/components/icons/DocumentNotFoundIcon";

export function PurchaseNotFoundState() {
  return (
    <EmptyState
      icon={<DocumentNotFoundIcon className="size-6" />}
      title="Purchase Not Found"
      subTitle="(ဝယ်ယူမှုရှာမတွေ့ပါ)"
      description="This purchase may have been removed, or the purchase code does not match any saved draft."
      goBackLink="/purchase"
    />
  );
}
