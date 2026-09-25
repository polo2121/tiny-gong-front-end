// _config/purchase-record-filters.ts

import type { TableFilterOption } from "@/components/table/TableFilter";
import type { PurchaseRecordFilters } from "../_schemas/purchase-records-filters-schema";

export const statusOptions: TableFilterOption<
  PurchaseRecordFilters["status"]
>[] = [
  { label: "All", value: "all" },
  { label: "Complete", value: "complete" },
  { label: "Incomplete", value: "incomplete" },
];