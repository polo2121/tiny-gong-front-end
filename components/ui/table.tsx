import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

function TableContainer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-container"
      className={cn("w-full overflow-x-auto scrollbar-soft", className)}
      {...props}
    />
  );
}

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <table
      data-slot="table"
      className={cn(
        "w-full min-w-[760px] border-separate border-spacing-0 caption-bottom text-sm xl:min-w-full",
        className,
      )}
      {...props}
    />
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("font-margarine", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "[&_tr:nth-child(even):not([data-loading=true])]:bg-highlight/5 [&_tr:last-child_td]:border-b-0 ",
        className,
      )}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("border-t bg-muted/50 font-semibold", className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "transition-colors data-[state=selected]:bg-muted ",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-11 bg-card-surface px-3 text-left align-middle text-sm font-normal text-table-header first:rounded-l-full last:rounded-r-full lg:px-4",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "border-b border-dashed border-gray-300 px-3 py-3 align-middle text-[15px] leading-6 lg:px-4 lg:py-4",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function TableActionButton({
  className,
  tone = "default",
  type = "button",
  ...props
}: React.ComponentProps<"button"> & {
  tone?: "default" | "destructive";
}) {
  return (
    <button
      data-slot="table-action-button"
      type={type}
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-full bg-transparent px-3 font-chewy text-sm transition-all hover:-translate-y-0.5",
        tone === "destructive"
          ? "border border-dashed border-destructive text-destructive hover:bg-destructive/10"
          : "text-hightlight hover:bg-highlight/10",
        className,
      )}
      {...props}
    />
  );
}

function TableActionLink({
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      data-slot="table-action-link"
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-full bg-transparent px-3 font-chewy text-sm text-hightlight transition-all hover:-translate-y-0.5 hover:bg-highlight/10",
        className,
      )}
      {...props}
    />
  );
}

export {
  Table,
  TableActionButton,
  TableActionLink,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
