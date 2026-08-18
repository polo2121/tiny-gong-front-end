import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Customer, NewCustomerFormValues } from "./types";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { newCustomerSchema } from "./schema";

type NewCustomerModeProps = {
  onSave: (customer: Customer) => void;
  onCancel: () => void;
};

export function NewCustomerMode({ onSave, onCancel }: NewCustomerModeProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCustomerFormValues>({
    resolver: zodResolver(newCustomerSchema),
    mode: "onSubmit",
  });

  function saveCustomerDraft(customer: NewCustomerFormValues) {
    onSave(customer);
    onCancel();
    // TODO: Save this trimmed customer draft to the sale draft store.
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(saveCustomerDraft)}>
      <Field data-invalid={Boolean(errors.name)}>
        <FieldLabel>Full Name</FieldLabel>
        <Input
          type="text"
          placeholder="Customer name"
          autoComplete="off"
          aria-invalid={Boolean(errors.name)}
          className={cn(errors.name && "ring-2 ring-pink-700/30")}
          {...register("name")}
        />

        {errors.name?.message && (
          <FieldError>*{errors.name.message}</FieldError>
        )}
      </Field>

      <Field data-invalid={Boolean(errors.phone)}>
        <FieldLabel>Phone Number</FieldLabel>
        <Input
          type="tel"
          placeholder="09..."
          autoComplete="tel"
          inputMode="tel"
          aria-invalid={Boolean(errors.phone)}
          className={cn(errors.phone && "ring-2 ring-pink-700/30")}
          {...register("phone")}
        />
        {errors.phone?.message && (
          <FieldError>*{errors.phone.message}</FieldError>
        )}
      </Field>

      <Field data-invalid={Boolean(errors.deliveryAddress)}>
        <FieldLabel>Delivery Address</FieldLabel>
        <Input
          type="text"
          placeholder="Street, township, city"
          autoComplete="street-address"
          aria-invalid={Boolean(errors.deliveryAddress)}
          className={cn(errors.deliveryAddress && "ring-2 ring-pink-700/30")}
          {...register("deliveryAddress")}
        />
        {errors.deliveryAddress?.message && (
          <FieldError>*{errors.deliveryAddress.message}</FieldError>
        )}
      </Field>

      <div className="grid w-full grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          showIcon={false}
          className="w-full"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button className="w-full" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
