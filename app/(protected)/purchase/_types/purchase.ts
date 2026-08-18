export type RegisteredProduct = {
  id: string;
  name: string;
  category: "clothing";
  seriesCode: string;
  sellPrice: number;
  purchasePrice: number;
  expectedVariants: number;
  registeredVariantIds: string[];
};

export type PurchaseRecord = {
  id: string;
  supplier: string;
  expectedProducts: number;
  registeredProducts: RegisteredProduct[];
  date: string;
  totalPrice: number;
  note?: string | null;
};
