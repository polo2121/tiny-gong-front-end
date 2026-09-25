import { PURCHASE_ERROR_MESSAGES } from "@/lib/errors/purchase-error-messages";

export const FEATURE_ERROR_MESSAGES = {
  ...PURCHASE_ERROR_MESSAGES,
} as const;
