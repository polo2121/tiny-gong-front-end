import { TableCell, TableRow } from "@/components/ui/table";
import { Alert } from "../ui/alert";

type TableErrorRowProps = {
  colSpan?: number;
  title?: string;
  description?: string;
};

export function TableErrorRow({
  colSpan = 6,
  title,
  description,
}: TableErrorRowProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <Alert
          tone="destructive"
          title={title ?? "Could not load records."}
          description={description ?? "Sorry. Something went wrong!"}
          className="w-fit m-auto mt-4"
        />
      </TableCell>
    </TableRow>
  );
}
