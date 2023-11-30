const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CartItemSchema = new Schema({
  cart_id: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const CartItem = model('CartItem', CartItemSchema);

module.exports = CartItem;
