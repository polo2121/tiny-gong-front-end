import { z } from "zod";

import { bankingOptions, mobileWalletOptions } from "./constants";

const bankingProviderValues = bankingOptions.map((option) => option.value) as [
  (typeof bankingOptions)[number]["value"],
  ...(typeof bankingOptions)[number]["value"][],
];

const mobileWalletProviderValues = mobileWalletOptions.map(
  (option) => option.value,
) as [
  (typeof mobileWalletOptions)[number]["value"],
  ...(typeof mobileWalletOptions)[number]["value"][],
];

export const paymentDraftSchema = z.union([
  z.object({
    status: z.literal("unpaid"),
    method: z.enum(["cash", "wallet", "bank"]),
    provider: z.null(),
  }),
  z.object({
    status: z.literal("paid"),
    method: z.literal("cash"),
    provider: z.null(),
  }),
  z.object({
    status: z.literal("paid"),
    method: z.literal("wallet"),
    provider: z.enum(mobileWalletProviderValues, {
      error: "Choose a wallet provider.",
    }),
  }),
  z.object({
    status: z.literal("paid"),
    method: z.literal("bank"),
    provider: z.enum(bankingProviderValues, {
      error: "Choose a bank provider.",
    }),
  }),
]);

export type PaymentDraft = z.infer<typeof paymentDraftSchema>;
