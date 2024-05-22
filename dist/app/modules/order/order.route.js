"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
// create Order
router.post("/orders", order_controller_1.OrderControllers.createOrder);
// get all Orders
router.get("/orders", order_controller_1.OrderControllers.getAllOrder);
exports.OrderRoutes = router;
