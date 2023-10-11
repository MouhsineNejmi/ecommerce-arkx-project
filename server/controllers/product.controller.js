const product = require("../models/products.models");

export const addProduct = async (req, res) => {
  const {
    sku,
    product_image,
    product_name,
    short_description,
    long_description,
    price,
    discount_price,
    options,
  } = req.body;

  try {
    const newProduct =  await product.create({
      product_image: product_image,
      product_name: product_name,
      short_description: short_description,
      long_description: long_description,
      price: price,
      discount_price: discount_price,
      active: false,
    });
    return res.status(200).json({
      newProduct,
      status: 201,
      message: "product created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

/*export const listProduct = async (req, res) => {
try {
    const products = await Product.find();

    return res.status(200).json({
      products,
      message: "Products retrieved successfully",
    });
 

    
} catch (error) {
    console.error(error); 
    return res.status(500).json({
      message: "Internal server error",
    });
  }



}*/



