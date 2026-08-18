"use client";

import * as React from "react";

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
import { AlertIcon } from "./icons/AlertIcon";
import { getErrorMessage } from "@/lib/errors/get-error-message";
import { normalizeError } from "@/lib/errors/normalize-error";

interface DestructiveConfirmationProps {
  trigger: React.ReactElement;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description?: string;
}

export function DestructiveConfirmation({
  trigger,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone. Please confirm before continuing.",
}: DestructiveConfirmationProps) {
  const [open, setOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function handleConfirm() {
    try {
      setIsPending(true);
      await onConfirm();
      setOpen(false);
    } catch (error) {
      const appError = normalizeError(error);

      setErrorMessage(getErrorMessage(appError.code));
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (typeof nextOpen !== "boolean") {
          return;
        }

        if (!isPending) {
          setErrorMessage(null);
          setOpen(nextOpen);
        }
      }}
    >
      <DialogTrigger render={trigger} />

      <DialogContent className="flex max-w-md flex-col items-center gap-5 p-6 text-center border-3 border-red-100">
        <DestructiveActionIllustration className="h-auto w-40" />

        <div className="flex flex-col gap-2">
          <DialogTitle className="font-umoe text-2xl text-foreground">
            {title}

            {/* {subtitle && (
              <span className="mt-1 block font-umoe text-base text-muted-foreground">
                ({subtitle})
              </span>
            )} */}
          </DialogTitle>

          <DialogDescription className="text-sm font-normal leading-6 text-muted-foreground wrap-break-word">
            {description}
          </DialogDescription>
        </div>

        {errorMessage && (
          <div className="w-full flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-left">
            <AlertIcon className="size-5 text-destructive" />
            <div>
              <h4 className="text-sm font-margarine text-destructive">
                {errorMessage}
              </h4>
              <p className="text-xs font-medium pt-1 ">
                This will permanently delete your account and remove your data
                from our servers.
              </p>
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
