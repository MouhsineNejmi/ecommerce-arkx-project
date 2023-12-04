const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CartSchema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
});

const Cart = model('Cart', CartSchema);

module.exports = Cart;
