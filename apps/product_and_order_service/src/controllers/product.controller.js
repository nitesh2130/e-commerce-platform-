import { ApiResponse } from "../../../users_loging_service/src/utils/ApiResponse.js";
import { uploadOnCloudinary } from "../../../users_loging_service/src/utils/cloudinary.js";
import { Product } from "../db/index.js"
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addProduct = asyncHandler( async(req, res) => {
    const { productName, description, price, brand, category_id, total_stock_quantity } = req.body;

    if( !productName || !description || !price || !brand || !category_id || !total_stock_quantity ) {
        throw new ApiError(404, "Data is not available")
    } 

    const productImageLocalPath = req.files?.productImage[0].path;
    
    if( !productImageLocalPath ) {
        throw new ApiError(404, "Image are not available. ");
    }

    const productImege = await uploadOnCloudinary(productImageLocalPath);
    if( !productImege ) {
        throw new ApiError(404, "productImege is not uploaded on ther cloudinary");
    }

    const product = await Product.create({
        productName: productName,
        productImege: productImege,
        description: description,
        price: price,
        brand: brand,
        category_id: category_id,
        total_stock_quantity: total_stock_quantity
    })

    if( !product ) {
        throw new ApiError( 50, " Somthing went wrong, when at created at user ");
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200, {
            product
        },
        "user login successfully"
    ))
})


const updateProduct = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const { productName, description, price, brand, category_id, total_stock_quantity } = req.body;

    if( !productName && !description && !price && !brand && !category_id && !total_stock_quantity ) {
        throw new ApiError( 404, "Atleast one feild are required to update");
    }

    const product = await Product.findById(id);
    if(!product) {
        throw new ApiError( 404, "product are not available ");
    }

    const updatedProduct = await product.update({
        productName,
        description,
        price,
        brand,
        category_id,
        total_stock_quantity
    })

    if( !updatedProduct ) {
        throw new ApiError(500, "product is not update, Somthing went wrong");
    }

    return res
    .status(200)
    .json(
       new ApiResponse(
        200, {
            updatedProduct
        },
        "Product update is successfully",
       )
    )
})







export { addProduct, updateProduct }