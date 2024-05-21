import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// create a product
router.post("/products", ProductControllers.createProduct);
// get all product
router.get("/products", ProductControllers.getAllProducts);
// get a single product
router.get("/products/:productId", ProductControllers.getSingleProduct);
// Update a product
router.put("/products/:productId", ProductControllers.updateSingleProduct);
// delete a product
router.delete("/products/:productId", ProductControllers.deleteSingleProduct);

export const ProductRoutes = router;
