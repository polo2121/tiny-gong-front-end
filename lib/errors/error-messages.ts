// lib/errors/error-messages.ts

import { PURCHASE_ERROR_MESSAGES } from "@/app/(protected)/purchase/_error/purchase-error-messages";

export type ApiError = {
  status: number;
  code?: string;
  message?: string;

};

export const ERROR_MESSAGES = {
  NETWORK_ERROR:
    "Please check your internet connection and try again.",

  REQUEST_TIMEOUT:
    "The request took too long. Please try again.",

  UNKNOWN_ERROR:
    "Something went wrong. Please try again.",

  INVALID_API_RESPONSE:
    "The server returned an invalid response. Please try again.",

  INVALID_API_ERROR_RESPONSE:
    "The server returned an invalid error response. Please try again.",

  ...PURCHASE_ERROR_MESSAGES,
} as const;
