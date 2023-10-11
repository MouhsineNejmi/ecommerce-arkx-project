const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema= new  Schema({

sku:{ type: String},
product_image:{type: String},
product_name:{ type: String},
category_id:{type: String},
short_description:{type: String},
long_description:{type: String},
price:{type: float},
quantity:{type: Number},
discount_price:{type: Number},
options:{  type: Array},
active :{  type: Boolean},
 seller_id:{  type: Number},

});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;



  
  