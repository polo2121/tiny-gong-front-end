import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ProductVariantIcon } from "@/components/icons/ProductVariantIcon";

type NoVariantsStateProps = {
  onCreateVariant?: () => void;
};

export function NoVariantsState({ onCreateVariant }: NoVariantsStateProps) {
  return (
    <Empty className="min-h-40 rounded-xl p-0 ">
      <div className="flex min-h-[inherit] w-full items-center justify-center rounded-lg bg-white pt-8 pb-3 ">
        <EmptyContent>
          <EmptyHeader>
            <EmptyMedia className="size-10 rounded-full bg-highlight-soft/10 text-highlight">
              <ProductVariantIcon className="size-6" />
            </EmptyMedia>

            <EmptyTitle className="flex flex-col items-center gap-1 leading-tight">
              <span>No Variants Registered</span>
              <span className="font-umoe text-base text-muted-foreground">
                (အမျိုးအစားမထည့်ရသေးပါ)
              </span>
            </EmptyTitle>
          </EmptyHeader>

          <EmptyDescription>
            <p>Add size, color, and quantity options for this product.</p>
          </EmptyDescription>

          <Button
            type="button"
            variant="outline"
            onClick={onCreateVariant}
            className="w-full"
          >
            Add Variant
          </Button>
        </EmptyContent>
      </div>
    </Empty>
  );
}
