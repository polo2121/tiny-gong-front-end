import React from "react";
import { PurchaseEditor } from "./_components/PurchaseEditor";
import PageHeader from "@/components/PageHeader";

const page = () => {
  return (
    <PageHeader title="New Purchase" subtitle="အရောင်းအသစ်">
      <PurchaseEditor />
    </PageHeader>
  );
};

export default page;
