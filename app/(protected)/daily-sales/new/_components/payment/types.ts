import type {
  bankingOptions,
  mobileWalletOptions,
  paymentStatuses,
} from "./constants";
import type { PaymentDraft } from "./schema";

export type PaymentStatus = (typeof paymentStatuses)[number]["value"];
export type PaymentMethod = "cash" | "wallet" | "bank";

export type BankingOption = (typeof bankingOptions)[number];
export type MobileWalletOption = (typeof mobileWalletOptions)[number];
export type PaymentOption = BankingOption | MobileWalletOption;

export type PaymentProvider = PaymentOption["value"] ;

export type PaymentFormState = {
  status: PaymentStatus;
  method: PaymentMethod | null;
  provider: PaymentProvider | null;
};

export type Payment = PaymentDraft;
