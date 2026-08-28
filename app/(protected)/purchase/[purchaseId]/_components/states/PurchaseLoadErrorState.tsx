import { EmptyState } from "@/components/EmptyState";
import { AlertIcon } from "@/components/icons/AlertIcon";

type PurchaseLoadErrorStateProps = {
  error: string;
};

export function PurchaseLoadErrorState({ error }: PurchaseLoadErrorStateProps) {
  return (
    <EmptyState
      icon={<AlertIcon className="size-6" />}
      title="Could Not Load Purchase"
      subTitle="(ဝယ်ယူမှုကို ဖွင့်၍မရပါ)"
      description={error}
      goBackLink="/purchase"
      mediaClassName="bg-destructive/10 text-destructive"
    />
  );
}
