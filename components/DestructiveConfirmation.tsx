"use client";

import * as React from "react";

import { AlertIcon } from "@/components/icons/AlertIcon";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { DestructiveActionIllustration } from "@/components/illustrations/DestructiveActionIllustration";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getErrorMessage } from "@/lib/errors/get-error-message";

type DestructiveConfirmationProps = {
  title?: string;
  description?: string;
  onConfirm: () => Promise<void>;
  isPending?: boolean;
  error?: unknown;
};

export function DestructiveConfirmation({
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone. Please confirm before continuing.",
  isPending = false,
  error,
}: DestructiveConfirmationProps) {
  const [open, setOpen] = React.useState(false);

  const errorMessage = error ? getErrorMessage(error) : null;

  async function handleConfirm() {
    await onConfirm();
    setOpen(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (isPending) return;
    setOpen(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            type="button"
            size="fit"
            variant="outline-dashed"
            tone="destructive"
            showIcon={false}
          >
            <TrashIcon className="size-4" />
          </Button>
        }
      />

      <DialogContent className="flex max-w-md flex-col items-center gap-5 border-3 border-red-100 p-6 text-center">
        <DestructiveActionIllustration className="h-auto w-40" />

        <div className="flex flex-col gap-2">
          <DialogTitle className="font-umoe text-2xl text-foreground">
            {title}
          </DialogTitle>

          <DialogDescription className="wrap-break-word text-sm font-normal leading-6 text-muted-foreground">
            {description}
          </DialogDescription>
        </div>

        {errorMessage && (
          <div className="flex w-full items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-left">
            <AlertIcon className="size-5 shrink-0 text-destructive" />

            <div>
              <h4 className="font-margarine text-sm text-destructive">
                {errorMessage}
              </h4>

              <p className="pt-1 text-xs font-medium">Please try again.</p>
            </div>
          </div>
        )}

        <DialogFooter className="mt-1 grid w-full grid-cols-2 gap-3">
          <DialogClose
            disabled={isPending}
            render={
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={isPending}
              />
            }
          >
            Cancel
          </DialogClose>

          <Button
            type="button"
            variant="destructive"
            className="w-full"
            disabled={isPending}
            onClick={handleConfirm}
          >
            {isPending ? "Removing..." : "Remove Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
