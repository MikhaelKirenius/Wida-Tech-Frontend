import * as z from 'zod';

export const formSchema = z.object({
  date: z.string().nonempty("Date is required"),
  customer_name: z.string().nonempty("Customer name is required"),
  salesperson_name: z.string().nonempty("Salesperson name is required"),
  notes: z.string().optional(),
  products: z.array(z.object({
    product_id: z.string().nonempty("Product ID is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
  })).min(1, "At least one product is required"),
});
