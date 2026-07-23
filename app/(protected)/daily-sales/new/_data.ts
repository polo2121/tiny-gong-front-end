export type CartItem = {
  name: string;
  sku: string;
  category: ProductCategory;
  variant?: ProductVariant;
  qty: number;
  price: string;
  discount: string;
  total: string;
};

export type Customer = {
  id?: string;
  name: string;
  phone: string;
};

export type SummaryRow = {
  label: string;
  value: string;
};

export type ProductSearchResult = {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  category: ProductCategory;
  variants?: ProductVariant[];
  price: string;
  stock: number;
};

export type ProductCategory = "Clothing" | "Books" | "Toys";

export type ProductVariant = {
  label: string;
  size?: string;
  color?: string;
  ageRange?: string;
  material?: string;
};

export const cartColumns = ["Item", "Qty", "Price", "Discount", "Total", ""];

export const cartItems: CartItem[] = [
  {
    name: "Dino Cotton T-Shirt",
    sku: "KID-TS-1001",
    category: "Clothing",
    variant: {
      label: "Size 4Y / Sky Blue",
      size: "4Y",
      color: "Sky Blue",
    },
    qty: 2,
    price: "12,000",
    discount: "1,000",
    total: "23,000",
  },
  {
    name: "Animal Alphabet Book",
    sku: "KID-BK-2048",
    category: "Books",
    variant: {
      label: "Board Book / Ages 2-5",
      ageRange: "2-5",
    },
    qty: 3,
    price: "6,500",
    discount: "500",
    total: "19,000",
  },
  {
    name: "Wooden Shape Puzzle",
    sku: "KID-TY-3082",
    category: "Toys",
    variant: {
      label: "Wooden / Ages 3+",
      ageRange: "3+",
      material: "Wooden",
    },
    qty: 1,
    price: "13,000",
    discount: "0",
    total: "13,000",
  },
];

export const summaryRows: SummaryRow[] = [
  { label: "Items", value: "6" },
  { label: "Subtotal", value: "56,500" },
  { label: "Discount", value: "1,500" },
  { label: "Tax / Fees", value: "0" },
];

export const paymentMethods = ["Cash", "KPay", "Bank", "Credit"];

export const orderTotals = {
  totalQty: "6",
  grandTotal: "55,000",
  paidAmount: "60,000",
  change: "5,000 MMK",
};

export const mockCustomers: Customer[] = [
  {
    id: "customer_001",
    name: "May Thu",
    phone: "09 420 123 456",
  },
  {
    id: "customer_002",
    name: "Aung Pyae",
    phone: "09 777 456 123",
  },
  {
    id: "customer_003",
    name: "Nandar Hlaing",
    phone: "09 250 888 331",
  },
];

export const mockProducts: ProductSearchResult[] = [
  {
    id: "prod_1001",
    name: "Dino Cotton T-Shirt",
    sku: "KID-TS-1001",
    barcode: "8855101001",
    category: "Clothing",
    variants: [
      { label: "Size 3Y / Mint", size: "3Y", color: "Mint" },
      { label: "Size 4Y / Sky Blue", size: "4Y", color: "Sky Blue" },
      { label: "Size 5Y / Lemon", size: "5Y", color: "Lemon" },
    ],
    price: "12,000",
    stock: 24,
  },
  {
    id: "prod_2048",
    name: "Animal Alphabet Book",
    sku: "KID-BK-2048",
    barcode: "8855204801",
    category: "Books",
    variants: [{ label: "Board Book / Ages 2-5", ageRange: "2-5" }],
    price: "6,500",
    stock: 42,
  },
  {
    id: "prod_3082",
    name: "Wooden Shape Puzzle",
    sku: "KID-TY-3082",
    barcode: "8855308201",
    category: "Toys",
    variants: [
      {
        label: "Wooden / Ages 3+",
        ageRange: "3+",
        material: "Wooden",
      },
    ],
    price: "13,000",
    stock: 18,
  },
  {
    id: "prod_4120",
    name: "Rainbow Baby Socks",
    sku: "KID-CL-4120",
    barcode: "8855412001",
    category: "Clothing",
    variants: [
      { label: "0-6M / Rainbow", size: "0-6M", color: "Rainbow" },
      { label: "6-12M / Rainbow", size: "6-12M", color: "Rainbow" },
    ],
    price: "3,500",
    stock: 36,
  },
  {
    id: "prod_5164",
    name: "Soft Bunny Plush Toy",
    sku: "KID-TY-5164",
    barcode: "8855516401",
    category: "Toys",
    variants: [
      {
        label: "Small / Cream",
        size: "Small",
        color: "Cream",
      },
      {
        label: "Medium / Blush",
        size: "Medium",
        color: "Blush",
      },
    ],
    price: "9,000",
    stock: 15,
  },
  {
    id: "prod_6208",
    name: "Bedtime Story Collection",
    sku: "KID-BK-6208",
    barcode: "8855620801",
    category: "Books",
    variants: [{ label: "Hardcover Set / Ages 4-8", ageRange: "4-8" }],
    price: "15,500",
    stock: 12,
  },
];
