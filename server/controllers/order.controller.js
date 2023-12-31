const Order = require('../models/order.model');

exports.createOrder = async (req, res) => {
  try {
    const { customer_id, order_items, cart_total_price, status } = req.body;

    const newOrder = await Order.create({
      customer_id,
      order_items,
      order_date: Date.now(),
      cart_total_price,
      status,
    });

    console.log(newOrder);
    return res.status(201).json({
      status: 201,
      message: 'Order created successfully',
      data: newOrder,
    });
  } catch (err) {
    console.error(err);
    return res.json({
      message: err?.message,
    });
  }
};

exports.listAllOrders = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = 10;
    const skip = (page - 1) * perPage;

    const orders = await Order.find()
      .populate('customer_id', {
        password: 0,
        creation_date: 0,
        last_update: 0,
        last_login: 0,
        __v: 0,
      })
      .skip(skip)
      .limit(perPage);

    return res.status(200).json({
      status: 200,
      message: 'Order created successfully',
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: error?.message,
    });
  }
};

exports.getOrderByID = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        status: 404,
        message: 'Order not found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: error?.message,
    });
  }
};

exports.updateOrder = async (req, res) => {
  const { customer_id, order_items, order_date, cart_total_price, status } =
    req.body;

  try {
    const orderId = req.params.id;
    const updatedOrder = {
      customer_id,
      order_items,
      order_date,
      cart_total_price,
      status,
    };

    const order = await Order.findByIdAndUpdate(orderId, updatedOrder);

    if (!order) {
      return res.status(404).json({
        status: 404,
        message: 'Order not found',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Order status updated successfully',
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: error?.message,
    });
  }
};
