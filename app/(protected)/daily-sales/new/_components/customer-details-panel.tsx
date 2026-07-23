"use client";

import * as React from "react";
import { Pencil, UserCheck, UserPlus, X } from "lucide-react";

import DualText from "@/components/DualText";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

import type { Customer } from "../_data";

export interface CustomerDetailsPanelProps {
  customer?: Customer | null;
  existingCustomers?: Customer[];
  onSave?: (customer: Customer) => void;
}

type CustomerMode = "existing" | "new";

const modalCloseAnimationMs = 160;

const customerDetailsErrors = {
  missingExistingCustomer: "Choose an existing customer.",
  missingNewCustomerFields: "Full name and phone number are required.",
};

export function CustomerDetailsPanel({
  customer: customerProp,
  existingCustomers = [],
  onSave,
}: CustomerDetailsPanelProps = {}) {
  const isControlled = customerProp !== undefined;
  const [savedCustomer, setSavedCustomer] = React.useState<Customer | null>(
    null,
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [mode, setMode] = React.useState<CustomerMode>("existing");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCustomerId, setSelectedCustomerId] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState("");
  const [isClosing, setIsClosing] = React.useState(false);

  const customer = isControlled ? customerProp : savedCustomer;
  const hasCustomer = Boolean(customer);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredCustomers = React.useMemo(
    () =>
      existingCustomers.filter((item) =>
        [item.name, item.phone].some((value) =>
          value.toLowerCase().includes(normalizedSearchQuery),
        ),
      ),
    [existingCustomers, normalizedSearchQuery],
  );

  React.useEffect(() => {
    if (!isClosing) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setError("");
    }, modalCloseAnimationMs);

    return () => window.clearTimeout(timeoutId);
  }, [isClosing]);

  function openModal() {
    setMode(existingCustomers.length > 0 ? "existing" : "new");
    resetModalForm();
    setIsClosing(false);
    setIsOpen(true);
  }

  function closeModal() {
    if (isClosing) {
      return;
    }

    setIsClosing(true);
  }

  function resetModalForm() {
    setSearchQuery("");
    setSelectedCustomerId(customer?.id ?? "");
    setName(customer?.name ?? "");
    setPhone(customer?.phone ?? "");
    setError("");
  }

  function switchMode(nextMode: CustomerMode) {
    setMode(nextMode);
    setError("");
  }

  function selectExistingCustomer(customerId: string) {
    setSelectedCustomerId(customerId);
    setError("");
  }

  function saveCustomer(nextCustomer: Customer) {
    if (!isControlled) {
      setSavedCustomer(nextCustomer);
    }

    onSave?.(nextCustomer);
  }

  function handleSave() {
    if (mode === "existing") {
      const selectedCustomer = existingCustomers.find(
        (item) => item.id === selectedCustomerId,
      );

      if (!selectedCustomer) {
        setError(customerDetailsErrors.missingExistingCustomer);
        return;
      }

      saveCustomer(selectedCustomer);
      closeModal();
      return;
    }

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedPhone) {
      setError(customerDetailsErrors.missingNewCustomerFields);
      return;
    }

    saveCustomer({ name: trimmedName, phone: trimmedPhone });
    closeModal();
  }

  return (
    <>
      <section className="rounded-2xl bg-card-surface px-4 py-6 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <DualText label="Customer Details" subLabel="ကုန်ပစ္စည်းလည်ပတ်မှု" />

          <Button
            type="button"
            variant="ghost"
            showIcon={false}
            className="text-highlight-soft"
            onClick={openModal}
          >
            <Pencil className="size-4" />
            {hasCustomer ? "Edit" : "Add"}
          </Button>
        </div>

        {customer ? (
          <dl className="mt-5 flex flex-col gap-3 text-sm font-semibold">
            <div className="flex items-center justify-between gap-4">
              <dt className="opacity-65">Customer</dt>
              <dd className="text-right font-bold text-slate-950">
                {customer.name}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="opacity-65">Phone</dt>
              <dd className="text-right font-bold text-slate-950">
                {customer.phone}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="mt-5 text-sm font-semibold opacity-60">
            No customer selected.
          </p>
        )}
      </section>

      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm",
            isClosing
              ? "animate-modal-overlay-out"
              : "animate-modal-overlay-in",
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="customer-details-title"
        >
          <div
            className={cn(
              "w-full max-w-lg rounded-2xl bg-white p-5 shadow-nav-card",
              isClosing
                ? "animate-modal-content-out"
                : "animate-modal-content-in",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div id="customer-details-title">
                <DualText
                  label={hasCustomer ? "Edit Customer" : "Add Customer"}
                  subLabel="ဖောက်သည်အချက်အလက်"
                />
              </div>
              <button
                type="button"
                aria-label="Close customer details"
                className="flex size-9 items-center justify-center rounded-full text-hightlight transition hover:bg-highlight/10"
                onClick={closeModal}
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 rounded-full bg-slate-100 p-1">
              <ModeButton
                icon={UserCheck}
                isActive={mode === "existing"}
                onClick={() => switchMode("existing")}
              >
                Existing Customer
              </ModeButton>
              <ModeButton
                icon={UserPlus}
                isActive={mode === "new"}
                onClick={() => switchMode("new")}
              >
                New Customer
              </ModeButton>
            </div>

            <div key={mode} className="animate-tab-panel mt-5">
              {mode === "existing" ? (
                <ExistingCustomerMode
                  customers={filteredCustomers}
                  searchQuery={searchQuery}
                  selectedCustomerId={selectedCustomerId}
                  onSearchChange={setSearchQuery}
                  onSelectCustomer={selectExistingCustomer}
                />
              ) : (
                <NewCustomerMode
                  name={name}
                  phone={phone}
                  onNameChange={(value) => {
                    setName(value);
                    setError("");
                  }}
                  onPhoneChange={(value) => {
                    setPhone(value);
                    setError("");
                  }}
                />
              )}
            </div>

            {error && (
              <p className="mt-4 rounded-xl bg-pink-50 px-4 py-3 text-sm font-semibold text-pink-700">
                {error}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                showIcon={false}
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button type="button" showIcon={false} onClick={handleSave}>
                Save / Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ExistingCustomerMode({
  customers,
  searchQuery,
  selectedCustomerId,
  onSearchChange,
  onSelectCustomer,
}: {
  customers: Customer[];
  searchQuery: string;
  selectedCustomerId: string;
  onSearchChange: (value: string) => void;
  onSelectCustomer: (customerId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Field name="customer-search">
        <FieldLabel>Search Customer</FieldLabel>
        <FieldControl
          type="search"
          placeholder="Search by name or phone"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </Field>

      <div className="scrollbar-soft max-h-64 overflow-y-auto rounded-2xl border border-hightlight/15 bg-white p-2">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <button
              key={customer.id ?? `${customer.name}-${customer.phone}`}
              type="button"
              className={cn(
                "flex w-full items-center justify-between gap-4 rounded-xl px-3 py-3 text-left text-sm font-semibold transition hover:bg-highlight/10",
                selectedCustomerId === customer.id &&
                  "bg-highlight/10 text-hightlight",
              )}
              onClick={() => onSelectCustomer(customer.id ?? "")}
            >
              <span>
                <span className="block font-bold">{customer.name}</span>
                <span className="block text-xs opacity-60">
                  {customer.phone}
                </span>
              </span>
              {selectedCustomerId === customer.id && (
                <UserCheck className="size-5" />
              )}
            </button>
          ))
        ) : (
          <p className="px-4 py-5 text-sm font-semibold opacity-60">
            No customers found.
          </p>
        )}
      </div>
    </div>
  );
}

function NewCustomerMode({
  name,
  phone,
  onNameChange,
  onPhoneChange,
}: {
  name: string;
  phone: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-4">
      <Field name="customer-name">
        <FieldLabel>Full Name</FieldLabel>
        <FieldControl
          type="text"
          placeholder="Customer name"
          autoComplete="off"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          required
        />
        <FieldError match="valueMissing">Full name is required.</FieldError>
      </Field>

      <Field name="customer-phone">
        <FieldLabel>Phone Number</FieldLabel>
        <FieldControl
          type="tel"
          placeholder="09..."
          autoComplete="tel"
          value={phone}
          onChange={(event) => onPhoneChange(event.target.value)}
          required
        />
        <FieldError match="valueMissing">Phone number is required.</FieldError>
      </Field>
    </div>
  );
}

function ModeButton({
  icon: Icon,
  isActive,
  children,
  onClick,
}: {
  icon: typeof UserCheck;
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-10 items-center justify-center gap-2 rounded-full text-xs font-bold transition-all duration-200 ease-out hover:-translate-y-0.5",
        isActive
          ? "bg-white text-hightlight shadow-card"
          : "text-foreground/60",
      )}
      onClick={onClick}
    >
      <Icon className="size-4" />
      {children}
    </button>
  );
}
