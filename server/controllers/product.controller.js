const Product = require("../models/product.model");
//post create product
exports.addProduct = async (req, res) => {
  const {
    sku,
    categoryID,
    product_image,
    product_name,
    short_description,
    long_description,
    price,
    discount_price,
    options,
  } = req.body;

  try {
    
    const newProduct = await Product.create({
      category_id: categoryID,
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
// get list of products
exports.listProduct = async (req, res) => {
try {
    const products = await Product.find().limit(10);
  
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
}
//search for products

// get products by id 
exports.getProductID = async (req, res) => {
try {
  

  const id = req.params.id;
  const productId = await Product.findById({_id:id})
  if (!id){
    res.status(404).json({message: "ProductiD not found"})
  }

  return res.status(200).json({
    productId,
    message: "Product found",
  })        
} catch (error) {
  console.error(error); 
    return res.status(500).json({
      message: "Internal server error",
    });
}   
}


// update products
exports.updateProduct = async (req, res) => {

  try {
    const idProduct = req.params.id
    const updatedProduct = req.body
   
    if (!idProduct){
      res.status(404).json({ message: "product not found" });
    }
    const product= await  Product.findOneAndUpdate({_id:idProduct},updatedProduct,{new:true});
   
      res.status(200).send({
        product,
        message:"product updated successfully"})

  

    
  } catch (error) {
    console.log(error); 
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

// delete product 
exports.deleteProduct = async (req, res) => {

  try {

     const idProduct =req.params.id
     
     const products = await Product.deleteOne({_id :idProduct});

     if(!idProduct){
      return ("id product not found")
     }
    
      return res.status(200).json({ message: "Product deleted successfully" });

    
    
    
  } catch (error) {
    console.error(error); 
    return res.status(500).json({
      message: "Internal server error",
    });

  }
}
