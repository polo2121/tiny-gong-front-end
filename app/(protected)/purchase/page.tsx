import PageHeader from "@/components/PageHeader";
import { parseUrlParams } from "@/lib/url/parse-url-params";

import { PurchaseRecords } from "./_components/purchase-records";
import { getPurchaseListPageData } from "./_services/purchase-api";
import PurchaseStats from "./_components/PurchaseStats";
import { purchaseRecordFilterSchema } from "./_schemas/purchase-records-filters-schema";

type PurchasePageProps = {
  searchParams: Promise<Record<string, string>>;
};

export default async function PurchasePage({
  searchParams,
}: PurchasePageProps) {
  const params = await searchParams;
  const purchaseUrlParams = parseUrlParams(
    new URLSearchParams(params),
    purchaseRecordFilterSchema,
  );

  const { purchaseRecords, error } =
    await getPurchaseListPageData(purchaseUrlParams);

  return (
    <PageHeader title="Purchase" subtitle="ဝယ်ယူမှုစာရင်း">
      <section className="flex w-full flex-col gap-6">
        <PurchaseStats />
        <PurchaseRecords initialPurchaseRecords={purchaseRecords} />
      </section>
    </PageHeader>
  );
}
