export type TableState = "loading" | "error" | "empty" | "data";

type GetTableStateOptions = {
  isLoading: boolean;
  hasError: boolean;
  hasItems: boolean;
};

export function getTableState({
  isLoading,
  hasError,
  hasItems,
}: GetTableStateOptions): TableState {
  if (isLoading) {
    return "loading";
  }

  if (hasError) {
    return "error";
  }

  if (!hasItems) {
    return "empty";
  }

  return "data";
}
