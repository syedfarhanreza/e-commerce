import { Response } from "express";
import { TOrder } from "./order.interface";
import OrderModel from "./order.model";
import ProductModel from "../product/product.model";

const createOrderIntoDB = async (orderData: TOrder, res: Response) => {
  try {
    const productId = orderData.productId;

    const responsePayload = {
      success: false,
      message: "",
    };

    // Return if the order quantity is 0
    if (orderData.quantity < 1) {
      responsePayload.message = "Insufficient order quantity";
      responsePayload.success = false;
      return res.status(400).send(responsePayload);
    }

    // Find the product
    const product = await ProductModel.findById(productId);
    if (!product) {
      responsePayload.message = "Invalid product id";
      responsePayload.success = false;
      return res.status(400).json(responsePayload);
    }

    // Check if the product quantity is sufficient
    const productDetails = product.toObject();
    const availableQuantity = productDetails.inventory.quantity;
    const isProductInStock = productDetails.inventory.inStock;
    if (!isProductInStock || orderData.quantity > availableQuantity) {
      responsePayload.message = "Insufficient quantity available in inventory";
      responsePayload.success = false;
      return res.status(400).json(responsePayload);
    }

    // Check if the quantity is equal to available quantity
    const isQuantityEqual =
      productDetails.inventory.quantity === orderData.quantity;

    // Update the isStock property
    if (isQuantityEqual) {
      await ProductModel.findByIdAndUpdate(
        productId,
        { "inventory.inStock": false, "inventory.quantity": 0 },
        { new: true, runValidators: true }
      );
    } else {
      // Set new product Quantity
      await ProductModel.findByIdAndUpdate(
        productId,
        {
          "inventory.quantity":
            productDetails.inventory.quantity - orderData.quantity,
        },
        { new: true, runValidators: true }
      );
    }

    // Create the order
    const createdOrder = await OrderModel.create(orderData);

    responsePayload.message = "Order created successfully!";
    responsePayload.success = true;
    res.json({
      ...responsePayload,
      data: createdOrder,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Can't create order",
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllOrderService = async (query: any) => {
  const orders = await OrderModel.find(query);
  return orders;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderService,
};
