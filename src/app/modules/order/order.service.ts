/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import Order from "./order.model";
import { TOrder } from "./order.interface";
import ProductModel from "../product/product.model";

const createOrderIntoDB = async (orderData: TOrder, res: Response) => {
  try {
    const productId = orderData.productId;

    const response = {
      success: false,
      message: "",
    };

    // return if the order quantity is 0
    if (orderData.quantity < 1) {
      response.message = "Insufficient order quantity";
      response.success = false;
      return res.status(400).send(response);
    }

    // find the product
    const product = await ProductModel.findById(productId);
    if (!product) {
      response.message = "Invalid product id";
      response.success = false;
      return res.status(400).json(response);
    }

    //   check if the product quantity
    const productData = product.toObject();
    const availableQuantity = productData.inventory.quantity;
    const isStock = productData.inventory.inStock;
    if (!isStock || orderData.quantity > availableQuantity) {
      response.message = "Insufficient quantity available in inventory";
      response.success = false;
      return res.status(400).json(response);
    }

    //   check if the quantity is equal to available quantity
    const isEqualQuantity =
      productData.inventory.quantity === orderData.quantity;

    //   update the isStock property
    if (isEqualQuantity) {
      await ProductModel.findByIdAndUpdate(
        productId,
        { "inventory.inStock": false, "inventory.quantity": 0 },
        { new: true, runValidators: true },
      );
    } else {
      // set new product Quantity
      await ProductModel.findByIdAndUpdate(
        productId,
        {
          "inventory.quantity":
            productData.inventory.quantity - orderData.quantity,
        },
        { new: true, runValidators: true },
      );
    }

    //   set  order
    const result = await Order.create(orderData);

    response.message = "Order created successfully!";
    response.success = true;
    res.json({
      ...response,
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Cant't create order",
    });
  }
};

const getAllOrderFromDB = async (find: any) => {
  const result = await Order.find(find);
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
};
