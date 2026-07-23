import DualText from "@/components/DualText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PaymentPanelProps = {
  methods: string[];
  paidAmount: string;
  change: string;
};

export function PaymentPanel({ methods, paidAmount, change }: PaymentPanelProps) {
  return (
    <Card className="bg-white px-4 py-5 shadow-card">
      <CardHeader className="px-0">
        <CardTitle>
          <DualText label="Payment" subLabel="ငွေပေးချေမှု" />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 px-0">
        <div className="grid grid-cols-2 gap-2">
          {methods.map((method) => (
            <button
              key={method}
              type="button"
              className="h-10 rounded-full border border-hightlight/20 bg-white px-3 text-sm font-bold transition hover:-translate-y-0.5 hover:border-pink-600 hover:bg-pink-50 hover:text-pink-700"
            >
              {method}
            </button>
          ))}
        </div>

        <label className="flex flex-col gap-2 text-sm font-semibold">
          Paid Amount
          <div className="flex h-11 items-center justify-between rounded-2xl border border-hightlight/20 bg-white px-4">
            <span>{paidAmount}</span>
            <span className="text-xs font-bold opacity-60">MMK</span>
          </div>
        </label>

        <div className="flex items-center justify-between rounded-2xl bg-pink-50 px-4 py-3 text-sm font-bold text-pink-700">
          <span>Change</span>
          <span>{change}</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <Button variant="outline" size="lg">
            Save Draft
          </Button>
          <Button size="lg">Complete Sale</Button>
        </div>
      </CardContent>
    </Card>
  );
}
