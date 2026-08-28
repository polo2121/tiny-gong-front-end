import { FEATURE_ERROR_MESSAGES } from "./feature-error-messages";
import { GLOBAL_ERROR_MESSAGES } from "./global-error-messages";

export const ERROR_MESSAGES = {
  ...GLOBAL_ERROR_MESSAGES,
  ...FEATURE_ERROR_MESSAGES,
} as const;
