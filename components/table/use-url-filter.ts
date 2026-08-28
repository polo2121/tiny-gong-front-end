"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useUrlFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateFilter(name: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "all") {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  return {
    updateFilter,
  };
}
