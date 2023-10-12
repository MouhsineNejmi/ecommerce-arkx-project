const mongoose = require('mongoose');
const { schema } = require('./user.model');
const {Schema , model} = mongoose;

const orderSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId
    },
    order_items: {
        type: Array
    },
    order_date: {
        type: Date
    },
    cart_total_price: {
        type: Number
    },
    status: {
        type: String
    }
});

const Order = model('Order', orderSchema); 
module.exports= Order;