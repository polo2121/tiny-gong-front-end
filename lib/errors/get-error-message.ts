// lib/errors/get-error-message.ts

import { ERROR_MESSAGES } from "./error-messages";

export function getErrorMessage(code?: string) {
  if (!code) {
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }

  return (
    ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES] ??
    ERROR_MESSAGES.UNKNOWN_ERROR
  );
}