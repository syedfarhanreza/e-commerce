import { Schema } from "mongoose";

export type TOrder = {
  email: string;
  productId: string | Schema.Types.ObjectId;
  price: number;
  quantity: number;
};
