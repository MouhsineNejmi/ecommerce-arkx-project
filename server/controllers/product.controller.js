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
     const page  = req.query.page||1;
    const itemsPerPage = 10;
    const pageNumber = parseInt(page, 10) || 1;
    const skip = (pageNumber - 1) * itemsPerPage;


    const products = await Product.find().skip(skip).limit(itemsPerPage);
  
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
exports.searchforProduct = async (req, res) => {
  try {
    const { query, page } = req.query;
    const itemsPerPage = 10;
    const pageNumber = parseInt(page, 10) || 1;

    // Define the search query for product_name
    const searchQuery = {
      product_name: { $regex: new RegExp(query, "i") },
    };
    const skip = (pageNumber - 1) * itemsPerPage;

    // Project only the specified fields in the query
    const products = await Product.find(searchQuery)
      .select("sku product_image product_name price category_id") // Specify the fields you want
      .skip(skip)
      .limit(itemsPerPage)
      .exec();

    if (products.length === 0) {
      res
        .status(404)
        .json({ message: "No products found for the given search query" });
    } else {
      res.status(200).json({ products });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};


// get products by id 
exports.getProductID = async (req, res) => {
try {
  

  const id = req.params.id;
  const productId = await Product.findById({_id:id})
  if (!productId){
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
    const product= await  Product.findOneAndUpdate({_id:idProduct},updatedProduct,{new:true});
    if (!Product){
      res.status(404).json({ message: "product not found" });
    }
  
   
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

     const idProduct = req.params.id
     const deletedproducts = await Product.findByIdAndDelete(idProduct).exec();

   
     if(!deletedproducts){
        res.status(404).json({message: "product not found"})
     }
    
      return res.status(200).json({ message: "Product deleted successfully" });
    
  } catch (error) {
    console.error(error); 
    return res.status(500).json({
      message: "Internal server error",
    });

  }
}
