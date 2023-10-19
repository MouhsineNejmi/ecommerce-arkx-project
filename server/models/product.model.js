const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema({
  sku: { type: String },
  product_image: { type: String },
  product_name: { type: String },
  category_id: { type: Number },
  short_description: { type: String },
  long_description: { type: String },
  price: { type: Number },
  quantity: { type: Number },
  discount_price: { type: Number },
  options: { type: Array },
  active: { type: Boolean , default: false },
  seller_id: { type: Number },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
