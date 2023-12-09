const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
  order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  payment_date: { type: Date, default: Date.now() },
  amount: { type: Number, required: true },
  payment_method: { type: String, required: true },
  card: { type: Object, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending',
  },
});

const Payment = model('Payment', PaymentSchema);

module.exports = Payment;
