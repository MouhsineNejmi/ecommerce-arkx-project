const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  order_items: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
  order_date: {
    type: Date,
    default: Date.now(),
  },
  total: {
    type: Number,
    required: true,
  },
  delivery_status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Refund'],
    default: 'Pending',
    required: true,
  },
  shipping: {
    type: Object,
    required: true,
  },
});

const Order = model('Order', orderSchema);
module.exports = Order;
