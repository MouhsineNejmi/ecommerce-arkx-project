const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  order_items: {
    type: Array,
  },
  order_date: {
    type: Date,
  },
  cart_total_price: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['Open', 'Shipped', 'Paid', 'Closed', 'Canceled'],
    default: 'Open',
    required: true,
  },
});

const Order = model('Order', orderSchema);
module.exports = Order;
