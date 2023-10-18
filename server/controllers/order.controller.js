const Order = require("../models/order.model");

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
      message: "Order created successfully",
      newOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(403).json({
      status: 403,
      message: "You don't have enough privilege",
    });
  }
};

exports.listAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      status: 200,
      message: "Order created successfully",
      success: true,
      orders,
    });
  } catch (error) {
    console.error();
    res.status(403).json({
      status: 403,
      error: "You don't have enough privilege",
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
        message: "Order not found",
      });
    }
    res.status(200).json({
      status: 200,
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(403).json({
      status: 403,
      message: error.message,
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        status: 404,
        message: "Invalid order id",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error();
    res.status(403).json({
      status: 403,
      message: error.message,
    });
  }
};

