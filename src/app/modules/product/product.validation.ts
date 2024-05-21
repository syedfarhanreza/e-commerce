import { z } from "zod";

const zodVariant = z.object({
  type: z.string().nonempty({ message: "Variant type is required" }),
  value: z.string().nonempty({ message: "Variant value is required" }),
});

const zodInventory = z.object({
  quantity: z
    .number()
    .int()
    .nonnegative({ message: "Quantity must be a non-negative integer" }),
  inStock: z
    .boolean()
    .refine(
      (val) => typeof val === "boolean",
      "InStock must be a boolean value"
    ),
});

export const zodProduct = z.object({
  name: z.string().nonempty({ message: "Product name is required" }),
  description: z
    .string()
    .nonempty({ message: "Product description is required" }),
  price: z
    .number()
    .nonnegative({ message: "Price must be a non-negative number" }),
  category: z.string().nonempty({ message: "Product category is required" }),
  tags: z
    .array(z.string().nonempty({ message: "Tag cannot be empty" }))
    .nonempty({ message: "At least one tag is required" }),
  variants: z
    .array(zodVariant)
    .nonempty({ message: "At least one variant is required" }),
  inventory: zodInventory,
});
