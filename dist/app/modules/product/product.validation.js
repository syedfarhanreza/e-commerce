"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodProduct = void 0;
const zod_1 = require("zod");
const zodVariant = zod_1.z.object({
    type: zod_1.z.string().nonempty({ message: "Variant type is required" }),
    value: zod_1.z.string().nonempty({ message: "Variant value is required" }),
});
const zodInventory = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .int()
        .nonnegative({ message: "Quantity must be a non-negative integer" }),
    inStock: zod_1.z
        .boolean()
        .refine((val) => typeof val === "boolean", "InStock must be a boolean value"),
});
exports.zodProduct = zod_1.z.object({
    name: zod_1.z.string().nonempty({ message: "Product name is required" }),
    description: zod_1.z
        .string()
        .nonempty({ message: "Product description is required" }),
    price: zod_1.z
        .number()
        .nonnegative({ message: "Price must be a non-negative number" }),
    category: zod_1.z.string().nonempty({ message: "Product category is required" }),
    tags: zod_1.z
        .array(zod_1.z.string().nonempty({ message: "Tag cannot be empty" }))
        .nonempty({ message: "At least one tag is required" }),
    variants: zod_1.z
        .array(zodVariant)
        .nonempty({ message: "At least one variant is required" }),
    inventory: zodInventory,
});
