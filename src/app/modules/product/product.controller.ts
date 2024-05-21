import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { zodProduct } from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    // Zod validation
    const zodParsedData = zodProduct.parse(productData);

    const result = await ProductServices.createProductIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: "Product is created successfully",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
      error: err,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    const result = await ProductServices.getAllProductFromDB(searchTerm);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Product not found",
    });
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Product not found",
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const productData = req.body;
    const result = await ProductServices.updateSingleProductFromDB(
      productId,
      productData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Couldn't update data",
    });
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const result = await ProductServices.deleteSingleProductFromDB(productId);

    if (!result) {
      res.status(400).json({
        success: false,
        message: "failed to delete",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Couldn't delete data",
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
