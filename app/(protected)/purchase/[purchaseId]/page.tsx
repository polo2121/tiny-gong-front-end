import PageHeader from "@/components/PageHeader";

type PurchaseDetailsPageProps = {
  params: Promise<{
    purchaseId: string;
  }>;
};

export default async function PurchaseDetailsPage({
  params,
}: PurchaseDetailsPageProps) {
  const { purchaseId } = await params;

  return (
    <PageHeader title="Purchase Details" subtitle="ဝယ်ယူမှုအသေးစိတ်">
      <section className="rounded-2xl border border-dashed border-slate-200 bg-white p-6">
        <p className="text-sm font-medium text-muted-foreground">
          Purchase detail page reset for {purchaseId}.
        </p>
      </section>
    </PageHeader>
  );
}
