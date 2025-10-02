import { where } from "sequelize";
import { ApiResponse } from "../../../users_loging_service/src/utils/ApiResponse.js";
import { uploadOnCloudinary } from "../../../users_loging_service/src/utils/cloudinary.js";
import { Product } from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//get the public id from the url of the image
const getPublicIdOfProductImage = (url) => {
  const parts = url.split("/");
  const fileWithExt = parts.pop();
  const publicId = fileWithExt.split(".")[0];
  return publicId;
};

//delete the image from cloudinary
const deleteFromCloudinary = async (public_id) => {
  try {
    const result = await uploadOnCloudinary.uploader.destroy(public_id);
    console.log("Delete image from the cloudinary", result);
  } catch (error) {
    console.log("error to delete the image from cloudinary");
  }
};

// create ( Add ) product
const addProduct = asyncHandler(async (req, res) => {
  const {
    productName,
    description,
    price,
    brand,
    category_id,
    total_stock_quantity,
  } = req.body;

  if (
    !productName ||
    !description ||
    !price ||
    !brand ||
    !category_id ||
    !total_stock_quantity
  ) {
    throw new ApiError(404, "Data is not available");
  }

  const productImageLocalPath = req.files?.productImage[0].path;

  if (!productImageLocalPath) {
    throw new ApiError(404, "Image are not available. ");
  }

  const productImege = await uploadOnCloudinary(productImageLocalPath);
  if (!productImege) {
    throw new ApiError(404, "productImege is not uploaded on ther cloudinary");
  }

  const product = await Product.create({
    productName: productName,
    productImege: productImege,
    description: description,
    price: price,
    brand: brand,
    category_id: category_id,
    total_stock_quantity: total_stock_quantity,
  });

  if (!product) {
    throw new ApiError(50, " Somthing went wrong, when at created at user ");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        product,
      },
      "user login successfully"
    )
  );
});

//update product controller
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    productName,
    description,
    price,
    brand,
    category_id,
    total_stock_quantity,
  } = req.body;

  if (
    !productName &&
    !description &&
    !price &&
    !brand &&
    !category_id &&
    !total_stock_quantity
  ) {
    throw new ApiError(404, "Atleast one feild are required to update");
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "product are not available ");
  }

  const updatedProduct = await product.update({
    productName,
    description,
    price,
    brand,
    category_id,
    total_stock_quantity,
  });

  if (!updatedProduct) {
    throw new ApiError(500, "product is not update, Somthing went wrong");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        updatedProduct,
      },
      "Product update is successfully"
    )
  );
});

// update product image
const updateProductImage = asyncHandler(async (req, res) => {
  const productId = req.params?.id;
  const product = Product.findById(productId);

  // delete image on cloudinary
  const publicId = getPublicIdOfProductImage(product.productImage);

  const resultCloudinaryImageDelete = uploader.deleteFromCloudinary(publicId);
  console.log(
    resultCloudinaryImageDelete,
    "this is delete image on cloudinary "
  );

  // upload image on the cloudinary
  const productImageLocalPath = req.files.productImege[0].path;
  if (!productImageLocalPath) {
    throw new ApiError(
      404,
      "somthing went wrong, product image is not available"
    );
  }
  const response = uploadOnCloudinary(productImageLocalPath);
  if (!response) {
    throw new ApiError(500, "somthing went wrong");
  }
  console.log(response);

  const updatedProduct = product.update({
    productImage: response.url,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        response.url,
        "product image is updated successfully"
      )
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params?.id;
  if (!id) {
    throw new ApiError(404, "product id is not found");
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "product is not found in the db");
  }

  await product.destroy();
  console.log("product is deleted successfully");

  return res
    .status(200)
    .json(new ApiResponse(200, "product deleted successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
  const id = req.params?.id;
  if (!id) {
    throw new ApiError(404, "product id is not found");
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "product is not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, product, "get product information successfully")
    );
});

//get the product to the name search
const getProductToName = asyncHandler(async (req, res) => {
  const { productName, brand, minPrice, maxprice } = req.body;
  if (!productName || !brand || !minPrice || !maxprice) {
    throw new ApiError(404, "product Name is not found");
  }

  // this is hold all condition those we want to apply on the time of fetch the data to Database.
  let whereClause = {};

  // filter by name
  if (productName) {
    whereClause.productName = { [Op.iLike]: `%${productName}%` };
  }

  // filter by brand
  if (brand) {
    whereClause.brand = { [Op.iLike]: `%${brand}%` };
  }

  // filter by price
  if (minPrice || maxprice) {
    whereClause.price = {};
    if (minPrice) whereClause.price[Op.gte] = parseFloat(minPrice);
    if (maxPrice) whereClause.price[Op.lte] = parseFloat(maxprice);
  }

  if (!productName) {
  }

  const products = await Product.findAll({
    where: whereClause,
    order: [["price", "ASC"]],
  });

  if (!product) {
    throw new ApiError(404, "somthing went wrong , Data not found");
  }

  const product = await Product.find;
  return res
    .status(200)
    .json(new ApiResponse(200, products, "data is successfully"));
});

//get the product to the categories
const getProductByCategories = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, "data is successfully"));
});

// get the products with fillter price, categories
const getProductToFillter = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, "data is successfully"));
});

const getInitialProduct = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, "data is successfully"));
});

export {
  addProduct,
  updateProduct,
  updateProductImage,
  deleteProduct,
  getProductById,
  getProductByCategories,
  getProductToName,
  getProductToFillter,
  getInitialProduct,
};
