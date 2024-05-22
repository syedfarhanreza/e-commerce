import { z } from "zod";

export const zodOrder = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  productId: z.string(),
  price: z.number(),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
});
