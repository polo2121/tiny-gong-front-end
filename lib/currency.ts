export function parseCurrency(value: string) {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}
