import React from "react";
import PageHeader from "@/components/PageHeader";

import { NewPurchaseView } from "./_components/NewPurchaseView";

export default function page() {
  return (
    <PageHeader title="New Purchase" subtitle="ဝယ်ယူမှုစာရင်း">
      <NewPurchaseView />
    </PageHeader>
  );
}
