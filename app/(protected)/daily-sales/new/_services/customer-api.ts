import { sampleCustomers } from "../_data";
import type {
  SearchCustomersOptions,
  SearchCustomersResponse,
} from "../_components/customer/types";

const customerSearchDelayMs = 350;

export async function searchCustomers({
  query,
  signal,
}: SearchCustomersOptions): Promise<SearchCustomersResponse> {
  // TODO: Replace this temporary implementation with the real customer search API.
  // Example: GET /api/customers?search=${encodeURIComponent(query)}
  await wait(customerSearchDelayMs, signal);

  const normalizedQuery = query.trim().toLowerCase();
  const customers = sampleCustomers.filter((customer) =>
    [customer.name, customer.phone, customer.deliveryAddress].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    ),
  );

  return { customers };
}

function wait(delayMs: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Request aborted.", "AbortError"));
      return;
    }

    const timeoutId = window.setTimeout(resolve, delayMs);

    signal?.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timeoutId);
        reject(new DOMException("Request aborted.", "AbortError"));
      },
      { once: true },
    );
  });
}
