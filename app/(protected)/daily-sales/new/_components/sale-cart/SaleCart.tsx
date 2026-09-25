"use client";

import DualText from "@/components/DualText";
import { BarcodeScanIcon } from "@/components/icons/BarcodeScanIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useSaleDraftStore } from "../../_stores/use-sale-draft-store";
import { SaleItemSearch } from "../sale-item-search";
import { DesktopCartTable } from "./DesktopCartTable";
import { MobileCartList } from "./MobileCartList";

export function SaleCart() {
  const items = useSaleDraftStore((state) => state.items);

  return (
    <Card className="min-h-105 bg-white rounded-none">
      <CardHeader className="px-0">
        <CardTitle className="flex justify-between gap-4">
          <DualText
            label="Sale Cart"
            subLabel="အရောင်းခြင်းတောင်း"
            className="w-[30%]"
          />

          <div className="flex gap-4 w-[80%] justify-center items-center">
            <SaleItemSearch />
            <span className="w-0.5 h-11 bg-gray-100 rounded-full" />
            <Button variant="outline" size="default" showIcon={false}>
              <BarcodeScanIcon className="size-4" data-icon="inline-start" />
              Scan Barcode
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex min-h-75 flex-col px-0">
        <DesktopCartTable items={items} />
        <MobileCartList items={items} />
      </CardContent>
    </Card>
  );
}
