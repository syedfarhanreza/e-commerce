import { Schema, model } from "mongoose";
import { Order } from "./order.interface";

const orderSchema = new Schema<Order>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    product: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
const OrderModel = model("Order", orderSchema);
export default OrderModel;
