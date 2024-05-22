/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { zodOrder } from "./order.validation";

const { createOrderIntoDB, getAllOrderService } = OrderServices;

export const createOrder = async (req: Request, res: Response) => {
  const { body } = req;
  if (!body) {
    return res.send({
      success: false,
      message: "No product found",
    });
  }
  const { data, error } = zodOrder.safeParse(body);
  if (error) {
    return res.send({
      success: false,
      message: "Invalid order data format",
      error,
    });
  }

  await createOrderIntoDB(data, res);
};

export const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const find: any = {};
    if (email) {
      find.email = email;
    }

    const result = await getAllOrderService(find);

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
