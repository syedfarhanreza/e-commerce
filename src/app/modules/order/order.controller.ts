/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { orderServices } from "./order.service";
import { zodOrder } from "./order.validation";

// order services
const { createOrderIntoDB, getAllOrderFromDB } = orderServices;

export const createOrder = async (req: Request, res: Response) => {
  const { body } = req;
  const { order } = body;

  if (!order) {
    return res.send({
      success: false,
      message: "No order data found",
    });
  }
  const { data, error } = zodOrder.safeParse(order);
  if (error) {
    return res.send({
      success: false,
      message: "Invalid order data format",
      error,
    });
  }

  await createOrderIntoDB(data, res);
};

// get all order
export const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    // response data
    const find: any = {};
    if (email) {
      find.email = email;
    }

    const result = await getAllOrderFromDB(find);

    const response: any = {
      success: result.length > 0,
      message:
        result.length > 0 ? "Orders fetched successfully!" : "Order Not found",
    };

    if (result.length > 0) {
      response.data = result;
    }
    res.status(200).json(response);
  } catch {
    res.status(500).json({
      success: false,
      message: "Orders not found",
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrder,
};
