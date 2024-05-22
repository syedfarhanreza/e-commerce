import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

// create Order
router.post("/orders", OrderControllers.createOrder);
// get all Orders
router.get("/orders", OrderControllers.getAllOrder);

export const OrderRoutes = router;
