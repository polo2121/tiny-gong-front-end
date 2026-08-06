import { UserCheck } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { existingCustomerSchema } from "./schema";
import type { Customer } from "./types";

const previewCustomers = [
  {
    id: "customer_001",
    name: "May Thu",
    phone: "09 420 123 456",
    deliveryAddress: "sfsfsffs",
  },
  {
    id: "customer_002",
    name: "Aung Pyae",
    phone: "09 777 456 123",
    deliveryAddress: "sfsfsffs",
  },
  {
    id: "customer_003",
    name: "Nandar Hlaing",
    phone: "09 250 888 331",
    deliveryAddress: "sfsfsffs",
  },
];

type ExistingCustomerModeProps = {
  onSave: (customer: Customer) => void;
  onCancel: () => void;
};

export function ExistingCustomerMode({
  onSave,
  onCancel,
}: ExistingCustomerModeProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [error, setError] = useState("");

  const handleSaveCustomer = () => {
    setError("");

    const result = existingCustomerSchema.safeParse(selectedCustomer);
    if (!result.success) {
      setError(
        result.error.issues[0]?.message ??
          "Please choose one customer before clicking apply.",
      );
      return;
    }

    onSave(result.data);
  };

  return (
    <div className="flex flex-col gap-4">
      <Field data-invalid={Boolean(error)}>
        <FieldLabel>Search Customer</FieldLabel>
        <Input type="search" placeholder="Search by name or phone" />
        {error && (
          <FieldError>
            Please choose one customer before clicking apply.
          </FieldError>
        )}
      </Field>

      <div className="flex flex-col gap-2 scrollbar-soft max-h-64 overflow-y-auto rounded-2xl border border-hightlight/15 bg-white p-2">
        {previewCustomers.map((customer) => {
          const isSelected = selectedCustomer?.id === customer.id;

          return (
            <button
              key={customer.id}
              type="button"
              className={cn(
                "flex w-full items-center justify-between gap-4 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-highlight/10 hover:shadow-card cursor-pointer",
                isSelected && "bg-highlight/10 text-hightlight",
              )}
              onClick={() => {
                setSelectedCustomer(customer);
                setError("");
              }}
            >
              <span>
                <span className="block font-bold">{customer.name}</span>
                <span className="block text-xs opacity-60">
                  {customer.phone}
                </span>
              </span>
              {isSelected && <UserCheck className="size-5" />}
            </button>
          );
        })}
      </div>

      <div className="ml-auto grid w-full max-w-70 grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          showIcon={false}
          className="w-full"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button className="w-full" type="button" onClick={handleSaveCustomer}>
          Apply
        </Button>
      </div>
    </div>
  );
}
