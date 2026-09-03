"use client";

// NEXT
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// SHARED COMPONENTS
import DualText from "@/components/DualText";
import { SearchBar } from "@/components/table/SearchBar";
import { TableFilter } from "@/components/table/TableFilter";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

// SHARED HOOKS
import { useTableSearch } from "@/components/table/use-table-search";
import { useUrlFilter } from "@/components/table/use-url-filter";

// SHARED LIB
import { parseUrlParams } from "@/lib/url/parse-url-params";

// PURCHASE FEATURE - CONSTANTS
import { statusOptions } from "../_constants/purchase-filter-options";

// PURCHASE FEATURE - HOOKS
import { usePurchaseDrawer } from "../_hooks/use-purchase-drawer";
import { usePurchaseRecords } from "../_hooks/use-purchases";

// SCHEMAS / TYPES
import { PurchaseRecord } from "../_schemas/purchase-schema";
import { purchaseRecordFilterSchema } from "../_schemas/purchase-records-filters-schema";

// COMPONENTS
import { PurchaseForm } from "./PurchaseForm";
import { PurchaseRecordsTable } from "./purchase-records-table";
type PurchaseRecordsProps = {
  initialPurchaseRecords: PurchaseRecord[];
};

export function PurchaseRecords({
  initialPurchaseRecords,
}: PurchaseRecordsProps) {
  const {
    isOpen,
    selectedPurchase,
    openNewPurchase,
    openEditPurchase,
    closeDrawer,
    handleOpenChange,
  } = usePurchaseDrawer();

  const searchParams = useSearchParams();
  const { updateFilter } = useUrlFilter();

  const filters = parseUrlParams(
    new URLSearchParams(searchParams),
    purchaseRecordFilterSchema,
  );

  const {
    data: purchaseRecords = [],
    isPending,
    isFetching,
    isError,
    errorMessage,
  } = usePurchaseRecords({
    initialPurchaseRecords,
    filters,
  });

  const { query, handleSearch } = useTableSearch({
    onSearch: (value) => updateFilter("search", value),
  });

  const isSearching = query.trim().length > 0 && isFetching;

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-4">
        <DualText label="Purchase Records" subLabel="ဝယ်ယူမှုမှတ်တမ်းများ" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <SearchBar
              value={query}
              onValueChange={handleSearch}
              placeholder="Search purchase ID or supplier"
              isSearching={isSearching}
              className="w-full sm:max-w-sm"
            />

            <TableFilter
              label="Status"
              value={filters.status}
              options={statusOptions}
              onValueChange={(value) => updateFilter("status", value)}
            />
          </div>
          <Button>
            <Link href="/purchase/new">New Purchase</Link>
          </Button>
        </div>
      </header>

      <PurchaseRecordsTable
        purchaseRecords={purchaseRecords}
        isLoading={isPending}
        hasError={isError}
        errorMessage={errorMessage}
        onEdit={openEditPurchase}
      />

      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <DrawerContent className="m-auto max-w-2xl px-8 py-4">
          <PurchaseForm purchase={selectedPurchase} onClose={closeDrawer} />
        </DrawerContent>
      </Drawer>
    </section>
  );
}
