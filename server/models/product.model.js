const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
  sku: { type: String, required: true },
  product_images: { type: Array, required: true },
  product_name: { type: String, required: true },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
    required: true,
  },
  short_description: { type: String, required: true },
  long_description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  discount_price: { type: Number, required: true },
  options: { type: Array, required: true },
  active: { type: Boolean, default: true },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
