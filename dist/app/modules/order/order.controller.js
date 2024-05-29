"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = exports.getAllOrder = exports.createOrder = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
// order services
const { createOrderIntoDB, getAllOrderFromDB } = order_service_1.orderServices;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    if (!body) {
        return res.send({
            success: false,
            message: "No order data found",
        });
    }
    const { data, error } = order_validation_1.zodOrder.safeParse(body);
    if (error) {
        return res.send({
            success: false,
            message: "Invalid order data format",
            error,
        });
    }
    yield createOrderIntoDB(data, res);
});
exports.createOrder = createOrder;
// get all order
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        // response data
        const find = {};
        if (email) {
            find.email = email;
        }
        const result = yield getAllOrderFromDB(find);
        const response = {
            success: result.length > 0,
            message: result.length > 0 ? "Orders fetched successfully!" : "Order Not found",
        };
        if (result.length > 0) {
            response.data = result;
        }
        res.status(200).json(response);
    }
    catch (_a) {
        res.status(500).json({
            success: false,
            message: "Orders not found",
        });
    }
});
exports.getAllOrder = getAllOrder;
exports.OrderControllers = {
    createOrder: exports.createOrder,
    getAllOrder: exports.getAllOrder,
};
