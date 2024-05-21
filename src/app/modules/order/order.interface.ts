import { Schema } from "mongoose";

export type Order = {
  email: string;
  productId: string | Schema.Types.ObjectId;
  price: number;
  quantity: number;
};
