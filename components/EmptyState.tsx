import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon?: ReactNode;
  title: ReactNode;
  subTitle?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  goBackLink?: string;
  className?: string;
  contentClassName?: string;
  mediaClassName?: string;
};

export function EmptyState({
  icon,
  title,
  subTitle,
  description,
  action,
  goBackLink,
  className,
  contentClassName,
  mediaClassName,
}: EmptyStateProps) {
  const hasActions = Boolean(action || goBackLink);

  return (
    <Empty className={cn("bg-slate-50 min-h-100", className)}>
      <div className="flex  w-full h-full min-h-100 items-center justify-center rounded-lg bg-white">
        <EmptyContent
          className={cn(
            "h-full flex justify-center items-center w-full",
            contentClassName,
          )}
        >
          <EmptyHeader className="gap-3">
            {icon && (
              <EmptyMedia
                className={cn(
                  "size-10 rounded-full bg-highlight/10 text-highlight",
                  mediaClassName,
                )}
              >
                {icon}
              </EmptyMedia>
            )}

            <EmptyTitle className="flex flex-col items-center gap-1 leading-tight">
              <span>{title}</span>
              {subTitle && (
                <span className="font-umoe text-base text-muted-foreground tracking-wide">
                  {subTitle}
                </span>
              )}
            </EmptyTitle>
          </EmptyHeader>

          {description && <EmptyDescription>{description}</EmptyDescription>}
          {hasActions && (
            <div className="flex w-full flex-col gap-4">
              {action}

              {goBackLink && (
                <Link href={goBackLink}>
                  <Button
                    variant={action ? "ghost" : "default"}
                    showIcon={Boolean(!action)}
                    size={action ? "fit" : "lg"}
                  >
                    Go Back
                  </Button>
                </Link>
              )}
            </div>
          )}
        </EmptyContent>
      </div>
    </Empty>
  );
}
