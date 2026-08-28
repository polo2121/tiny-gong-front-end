"use client";

import { useState,useRef } from "react";

import { useDebouncedValue } from "@/hooks/use-debounced-value";

const tableSearchDebounceMilliseconds = 0;

type useTableSearchProps = {
  onSearch: (value: string) => void,
  delay?: number,
}

export function useTableSearch({onSearch, delay = 500} : useTableSearchProps) {
  const [query,setQuery] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch  = (value: string) => {
    setQuery(value);

    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, delay)

  }

    return {
    query,
    handleSearch,

  };
}
