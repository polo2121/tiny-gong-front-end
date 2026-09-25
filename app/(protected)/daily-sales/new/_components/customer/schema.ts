import { z } from "zod";

export const customerSchema = z.object({
  id: z.string().min(1).optional(),
  name: z.string().trim().min(1, "Full name is required."),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .regex(/^[0-9+()\-\s]{6,20}$/, "Enter a valid phone number."),
  deliveryAddress: z.string().trim().min(1, "Delivery address is required."),
});

export const existingCustomerSchema = customerSchema.extend({
  id: z.string().min(1, "Please choose one customer before clicking apply."),
});

export const newCustomerSchema = customerSchema.omit({
  id: true,
});
