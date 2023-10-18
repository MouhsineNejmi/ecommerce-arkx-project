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
      data: newOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      status: 403,
      message: "You don't have enough privilege",
    });
  }
};

exports.listAllOrders = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const perPage = 10;
    const skip = (page - 1) * perPage;

    const orders = await Order.find().skip(skip).limit(perPage);

    return res.status(200).json({
      status: 200,
      message: "Order created successfully",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      status: 403,
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
        message: "Order not found",
      });
    }
    return res.status(200).json({
      status: 200,
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      status: 403,
      message: error?.message,
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
    console.error(error);
    return res.status(403).json({
      status: 403,
      message: error?.message,
    });
  }
};
