import type {
  bankingOptions,
  mobileWalletOptions,
  paymentStatuses,
} from "./constants";
import type { PaymentDraft } from "./schema";

export type PaymentStatus = (typeof paymentStatuses)[number]["value"];

export type BankingOption = (typeof bankingOptions)[number];
export type MobileWalletOption = (typeof mobileWalletOptions)[number];
export type PaymentOption = BankingOption | MobileWalletOption;

export type PaymentOptionValue = PaymentOption["value"] | null;
export type PaymentMethodType = PaymentOption["paymentMethod"] | "cash" | null;

export type Payment = PaymentDraft;
