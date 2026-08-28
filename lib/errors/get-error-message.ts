import { ERROR_MESSAGES } from "./error-messages";
import { normalizeError } from "./normalize-error";

export function getErrorMessage(error: unknown) {
  const appError = normalizeError(error);

  return (
    ERROR_MESSAGES[appError.code as keyof typeof ERROR_MESSAGES] ??
    ERROR_MESSAGES.UNKNOWN_ERROR
  );
}
