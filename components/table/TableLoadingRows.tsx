import { TableCell, TableRow } from "@/components/ui/table";

type TableLoadingRowsProps = {
  colSpan?: number;
  rows?: number;
};

export function TableLoadingRows({
  colSpan = 7,
  rows = 5,
}: TableLoadingRowsProps) {
  return Array.from({ length: rows }).map((_, index) => (
    <TableRow key={index} data-loading="true" className="bg-transparent">
      <TableCell colSpan={colSpan} className="relative">
        <div className="h-10 animate-pulse rounded-md bg-slate-100 w-full relative flex justify-center items-center">
          {index === 0 && (
            <h1 className="absolute px-8 py-1 shadow-card text-highlight font-semibold bg-white border border-highlight rounded-full">
              Loading the records...
            </h1>
          )}
        </div>
      </TableCell>
    </TableRow>
  ));
}
