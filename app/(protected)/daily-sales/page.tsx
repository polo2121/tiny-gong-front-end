import Link from "next/link";
import { Plus, ReceiptText, WalletCards } from "lucide-react";

import PageHeader from "@/components/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const summaryCards = [
  {
    label: "Today's Sales",
    value: "0 MMK",
    icon: WalletCards,
    className: "bg-highlight/10 text-hightlight",
  },
  {
    label: "Orders",
    value: "0",
    icon: ReceiptText,
    className: "bg-pink-50 text-pink-700",
  },
];

export default function DailySalesPage() {
  return (
    <PageHeader title="Daily Sales" subtitle="နေ့စဉ်အရောင်းစာရင်း">
      <section className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm font-semibold opacity-70">
            Review today&apos;s sales activity and start a new sale when a
            customer is ready to check out.
          </p>
          <Link
            href="/daily-sales/new"
            className={buttonVariants({ size: "lg" })}
          >
            <Plus className="size-5" />
            New Sale
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <Card key={card.label} className="bg-white px-4 py-5 shadow-card">
                <CardContent className="flex items-center justify-between px-0">
                  <div>
                    <p className="text-sm font-bold opacity-60">{card.label}</p>
                    <p className="mt-2 font-chewy text-3xl">{card.value}</p>
                  </div>
                  <span
                    className={`flex size-12 items-center justify-center rounded-2xl ${card.className}`}
                  >
                    <Icon className="size-6" />
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="min-h-[360px] bg-white px-4 py-5 shadow-card">
          <CardHeader className="px-0">
            <CardTitle>Today&apos;s Transactions</CardTitle>
          </CardHeader>
          <CardContent className="flex min-h-[250px] items-center justify-center rounded-2xl border border-dashed border-hightlight/20 bg-highlight/5 px-4 text-center">
            <div className="flex max-w-sm flex-col items-center gap-3">
              <ReceiptText className="size-10 text-hightlight" />
              <h2 className="font-chewy text-2xl">No sales recorded yet</h2>
              <p className="text-sm font-semibold opacity-65">
                New completed sales will appear here for quick daily review.
              </p>
              <Link
                href="/daily-sales/new"
                className={buttonVariants({ variant: "secondary" })}
              >
                Create First Sale
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </PageHeader>
  );
}
