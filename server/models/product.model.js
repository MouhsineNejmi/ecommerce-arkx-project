const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    sku: { type: String, required: true },
    product_image: { type: String, required: true },
    product_name: { type: String, required: true },
    subcategory_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategories',
        required: true,
    },
    short_description: { type: String, required: true },
    long_description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    discount_price: { type: Number, required: true },
    options: { type: Array, required: true },
    active: { type: Boolean, default: true },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
