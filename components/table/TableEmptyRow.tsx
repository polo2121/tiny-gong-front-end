import type { ReactNode } from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { SearchEmptyIllustration } from "./SearchEmptyIllustration";

type TableEmptyRowProps = {
  colSpan?: number;
  media?: ReactNode;
  title?: string;
  description?: ReactNode;
  className?: string;
};

export function TableEmptyRow({
  colSpan,
  media,
  title,
  description,
  className,
}: TableEmptyRowProps) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className={cn("bg-white py-8 text-center font-semibold", className)}
      >
        <div className="flex min-h-120 flex-col items-center justify-center">
          {media ?? <SearchEmptyIllustration />}
          <h1 className="font-margarine text-3xl font-normal">
            {title ?? "Oops!"}
          </h1>
          {description ? (
            <div className="text-sm/relaxed font-semibold text-gray-500">
              {description}
            </div>
          ) : (
            <>
              <p className="text-lg/relaxed">No Match Found</p>
              <p>Couldn’t find what you’re looking for.</p>
              <p>It might have been moved or doesn’t exist.</p>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
