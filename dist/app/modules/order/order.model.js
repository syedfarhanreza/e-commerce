"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        product: true,
        ref: "Product",
        required: [true, "productId is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
    },
});
const OrderModel = (0, mongoose_1.model)("Order", orderSchema);
exports.default = OrderModel;
