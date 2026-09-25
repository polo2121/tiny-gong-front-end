import type { z } from "zod";

import type {
  customerSchema,
  existingCustomerSchema,
  newCustomerSchema,
} from "./schema";

export type Customer = z.infer<typeof customerSchema>;

export type ExistingCustomer = z.infer<typeof existingCustomerSchema>;

export type NewCustomerFormValues = z.infer<typeof newCustomerSchema>;

export type SelectCustomerHandler = (nextCustomer: Customer) => void;

export type CustomerMode = "existing" | "new";

export interface UseCustomerSearchOptions {
  enabled: boolean;
  query: string;
}

export interface UseCustomerSearchResult {
  customers: ExistingCustomer[];
  isInitialLoading: boolean;
  isSearching: boolean;
  error: string;
  refetch: () => void;
}

export type SearchCustomersOptions = {
  query: string;
  signal?: AbortSignal;
};

export type SearchCustomersResponse = {
  customers: ExistingCustomer[];
};

export type ExistingCustomerModeProps = {
};

export type NewCustomerModeProps = {
  formId?: string;
};
