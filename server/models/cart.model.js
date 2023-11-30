const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CartSchema = new Schema({
  buyer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  order_status: {
    enum: ['Cart', 'Checkout', 'Paid', 'Complete', 'Abandoned'],
    default: 'Cart',
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Cart = model('ShoppingCart', CartSchema);

module.exports = Cart;
