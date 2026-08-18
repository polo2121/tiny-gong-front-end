import { z } from "zod";

const unpaidPaymentSchema = z.object({
  status: z.literal("unpaid"),
  method: z.null(),
  provider: z.null(),
});

const cashPaymentSchema = z.object({
  status: z.literal("paid"),
  method: z.literal("cash"),
  provider: z.null(),
});

const walletPaymentSchema = z.object({
  status: z.literal("paid"),
  method: z.literal("wallet"),
  provider: z.enum(["k-pay", "wave-pay", "aya-pay", "uab-pay", "cb-pay", "yoma-pay"]),
});

const bankPaymentSchema = z.object({
  status: z.literal("paid"),
  method: z.literal("bank"),
  provider: z.enum(["kbz-bank", "aya-bank", "uab-bank", "agd-bank", "cb-bank", "yoma-bank"]),
});

export const paymentDraftSchema = z.union([
  unpaidPaymentSchema,
  cashPaymentSchema,
  walletPaymentSchema,
  bankPaymentSchema,
]);

export type PaymentDraft = z.infer<typeof paymentDraftSchema>;
