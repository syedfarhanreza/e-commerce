import Product from "./product.interface";
import ProductModel from "./product.model";

// create a product
const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

// get all products
const getAllProductFromDB = async (searchTerm?: string) => {
  let query = {};

  if (searchTerm) {
    query = {
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    };
  }

  const result = await ProductModel.find(query);
  return result;
};

// get single product
const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  return result;
};

// Update Product
const updateSingleProductFromDB = async (
  id: string,
  updateData: Partial<Product>
) => {
  const result = await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return result;
};
// delete a product
const deleteSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOneAndDelete({ _id: id });
  return result;
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
};
