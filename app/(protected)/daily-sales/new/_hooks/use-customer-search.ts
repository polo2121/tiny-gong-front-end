"use client";

import { useEffect, useRef, useState } from "react";

import { searchCustomers } from "../_services/customer-api";
import type {
  ExistingCustomer,
  UseCustomerSearchOptions,
  UseCustomerSearchResult,
} from "../_components/customer/types";
import { useDebouncedValue } from "./use-debounced-value";

const searchDebounceMilliseconds = 400;

export function useCustomerSearch({
  enabled,
  query,
}: UseCustomerSearchOptions): UseCustomerSearchResult {
  const debouncedQuery = useDebouncedValue(query, searchDebounceMilliseconds);
  const [customers, setCustomers] = useState<ExistingCustomer[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState("");
  const [requestVersion, setRequestVersion] = useState(0);
  const hasLoadedOnceRef = useRef(false);
  const isDebouncing = enabled && query.trim() !== debouncedQuery.trim();

  useEffect(() => {
    if (enabled === false) {
      setIsInitialLoading(false);
      setIsSearching(false);
      return;
    }

    const controller = new AbortController();

    async function loadCustomers() {
      const isFirstRequest = !hasLoadedOnceRef.current;

      try {
        if (isFirstRequest) {
          setIsInitialLoading(true);
        } else {
          setIsSearching(true);
        }
        setError("");
        const response = await searchCustomers({
          query: debouncedQuery,
          signal: controller.signal,
        });
        setCustomers(response.customers);
        hasLoadedOnceRef.current = true;
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === "AbortError"
        ) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Something went wrong while loading customers.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsInitialLoading(false);
          setIsSearching(false);
        }
      }
    }

    void loadCustomers();

    return () => {
      controller.abort();
    };
  }, [debouncedQuery, enabled, requestVersion]);

  function refetch() {
    setRequestVersion((currentVersion) => currentVersion + 1);
  }

  return {
    customers,
    isInitialLoading,
    isSearching: isSearching || isDebouncing,
    error,
    refetch,
  };
}
