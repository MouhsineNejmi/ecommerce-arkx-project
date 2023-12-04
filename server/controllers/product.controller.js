const Product = require('../models/product.model');
const { handleMultipleImagesUpload } = require('../utils/handleUpload.utils');

//post create product
exports.addProduct = async (req, res) => {
  const {
    category_id,
    product_name,
    sku,
    short_description,
    long_description,
    price,
    discount_price,
    options,
    quantity,
  } = req.body;

  try {
    const product_images = await handleMultipleImagesUpload(req.files);

    const newProduct = await Product.create({
      sku,
      category_id,
      product_images,
      product_name: product_name,
      short_description: short_description,
      long_description: long_description,
      price: price,
      discount_price: discount_price,
      options,
      active: false,
      quantity,
    });

    return res.status(200).json({
      status: 200,
      newProduct,
      message: 'product created successfully',
    });
  } catch (error) {
    return res.status(500).json({ message: error?.message });
  }
};
// get list of products
exports.listProduct = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const itemsPerPage = 20;
    const pageNumber = parseInt(page, 10) || 1;
    const skip = (pageNumber - 1) * itemsPerPage;

    const products = await Product.find()
      .populate('category_id')
      .skip(skip)
      .limit(itemsPerPage);

    if (!products) {
      return res.status(404).json({
        status: 404,
        message: 'Products not found!',
      });
    }

    return res.status(200).json({
      status: 200,
      data: products,
      message: 'Products retrieved successfully',
    });
  } catch (error) {
    console.error(error);
    return res.json({ message: error?.message });
  }
};
//search for products
exports.searchforProduct = async (req, res) => {
  try {
    const { query, page } = req.query;
    const itemsPerPage = 10;
    const pageNumber = parseInt(page, 10) || 1;

    // Define the search query for product_name
    const searchQuery = {
      product_name: { $regex: new RegExp(query, 'i') },
    };
    const skip = (pageNumber - 1) * itemsPerPage;

    // Project only the specified fields in the query
    const products = await Product.find(searchQuery)
      .skip(skip)
      .limit(itemsPerPage)
      .exec();

    if (products.length === 0) {
      return res.status(404).json({
        message: 'No products found for the given search query',
      });
    }
    return res.status(200).json({
      status: 200,
      data: products,
    });
  } catch (error) {
    return res.json({ message: error?.message });
  }
};

// get products by id
exports.getProductByID = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate('category_id').exec();

    if (!product) {
      res.status(404).json({ message: 'ProductiD not found' });
    }

    return res.status(200).json({
      data: product,
      message: 'Product found',
    });
  } catch (error) {
    console.error(error);
    return res.json({ message: error?.message });
  }
};

// update products
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      updatedProduct,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'product not found' });
    }

    return res.status(200).send({
      data: product,
      message: 'product updated successfully',
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: error?.message });
  }
};

// delete product
exports.deleteProduct = async (req, res) => {
  try {
    const idProduct = req.params.id;
    const deletedproduct = await Product.findByIdAndDelete(idProduct).exec();

    if (!deletedproduct) {
      return res.status(404).json({
        status: 404,
        message: 'product not found',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.json({ message: error?.message });
  }
};
