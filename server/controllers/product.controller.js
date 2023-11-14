const Product = require('../models/product.model');
import { generateRandomString } from '../utils/generateRandomString';

//post create product
exports.addProduct = async (req, res) => {
    const {
        categoryID,
        product_image,
        product_name,
        short_description,
        long_description,
        price,
        discount_price,
        options,
    } = req.body;

    const sku = generateRandomString();

    try {
        const newProduct = await Product({
            sku,
            category_id: categoryID,
            product_image: product_image,
            product_name: product_name,
            short_description: short_description,
            long_description: long_description,
            price: price,
            discount_price: discount_price,
            options,
            active: false,
        });

        await newProduct.save();

        return res.status(200).json({
            status: 200,
            message: 'product created successfully',
            newProduct,
        });
    } catch (error) {
        console.log(error);
        return res.json({ message: error?.message });
    }
};
// get list of products
exports.listProduct = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const itemsPerPage = 10;
        const pageNumber = parseInt(page, 10) || 1;
        const skip = (pageNumber - 1) * itemsPerPage;

        const products = await Product.find().skip(skip).limit(itemsPerPage);

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
exports.getProductID = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

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
        const idProduct = req.params.id;
        const updatedProduct = req.body;
        const product = await Product.findOneAndUpdate(
            { _id: idProduct },
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
        const deletedproduct = await Product.findByIdAndDelete(
            idProduct
        ).exec();
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
