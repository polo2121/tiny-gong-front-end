import type { ReactNode } from "react";
import { Pencil } from "lucide-react";

import DualText from "@/components/DualText";
import { Button } from "@/components/ui/button";

interface DraftPreviewCardProps {
  title: string;
  subLabel: string;
  actionLabel: string;
  onAction: () => void;
  children: ReactNode;
}

export function DraftPreviewCard({
  title,
  subLabel,
  actionLabel,
  onAction,
  children,
}: DraftPreviewCardProps) {
  return (
    <section className="flex w-full flex-col gap-4 rounded-2xl border border-dashed border-gray-300 px-5 py-6">
      <div className="flex items-start justify-between gap-4">
        <DualText label={title} subLabel={subLabel} />

        <Button
          type="button"
          variant="ghost"
          size="fit"
          showIcon={false}
          className="text-highlight-soft"
          onClick={onAction}
        >
          <Pencil className="size-4" />
          {actionLabel}
        </Button>
      </div>

      {children}
    </section>
  );
}
