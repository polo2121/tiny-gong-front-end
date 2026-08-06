export const bankingOptions = [
  {
    value: "aya-bank",
    label: "AYA",
    paymentMethod: "bank",
    logoSrc: "/images/payment-providers/aya-bank.svg",
    fallback: "AYA",
  },
  {
    value: "kbz-bank",
    label: "KBZ",
    paymentMethod: "bank",
    logoSrc: "/images/payment-providers/kbz-bank.svg",
    fallback: "KBZ",
  },
  {
    value: "cb-bank",
    label: "CB",
    paymentMethod: "bank",
    logoSrc: "/images/payment-providers/cb-bank.svg",
    fallback: "CB",
  },
  {
    value: "yoma-bank",
    label: "YOMA",
    paymentMethod: "bank",
    logoSrc: "/images/payment-providers/yoma-bank.svg",
    fallback: "YOMA",
  },
  {
    value: "uab-bank",
    label: "UAB",
    paymentMethod: "bank",
    logoSrc: "/images/payment-providers/uab-bank.svg",
    fallback: "UAB",
  },
  {
    value: "agd-bank",
    label: "AGD",
    paymentMethod: "bank",
    logoSrc: "/images/payment-providers/agd-bank.svg",
    fallback: "AGD",
  },
] as const;

export const mobileWalletOptions = [
  {
    value: "aya-pay",
    label: "AYA Pay",
    paymentMethod: "wallet",
    logoSrc: "/images/payment-providers/aya-bank.svg",
    fallback: "AYA Pay",
  },
  {
    value: "k-pay",
    label: "KBZ Pay",
    paymentMethod: "wallet",
    logoSrc: "/images/payment-providers/kbz-bank.svg",
    fallback: "KBZ Pay",
  },
  {
    value: "cb-pay",
    label: "CB Pay",
    paymentMethod: "wallet",
    logoSrc: "/images/payment-providers/cb-bank.svg",
    fallback: "CB Pay",
  },
  {
    value: "yoma-pay",
    label: "YOMA Pay",
    paymentMethod: "wallet",
    logoSrc: "/images/payment-providers/yoma-bank.svg",
    fallback: "YOMA Pay",
  },
  {
    value: "uab-pay",
    label: "UAB Pay",
    paymentMethod: "wallet",
    logoSrc: "/images/payment-providers/uab-bank.svg",
    fallback: "UAB Pay",
  },
  {
    value: "wave-pay",
    label: "Wave Pay",
    paymentMethod: "wallet",
    logoSrc: null,
    fallback: "Wave Pay",
  },
] as const;

export const paymentStatuses = [
  { value: "paid", label: "Paid" },
  { value: "unpaid", label: "Unpaid" },
] as const;

export const paymentProviders = {
  cash: [],
  wallet: mobileWalletOptions,
  bank: bankingOptions,
} as const;
