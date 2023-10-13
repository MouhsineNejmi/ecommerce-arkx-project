const Order = require('../models/order.model');

exports.createOrder = async(req, res) => {
  try {
    const {
      customer_id,
      order_items,
      order_date,
      cart_total_price,
      status,
    } = req.body;

    const newOrder = await Order.create({
      customer_id,
      order_items,
      order_date,
      cart_total_price,
      status,
    });

    console.log(newOrder);
    return res.status(201).json({
      status: 201,
      message: "Order created successfully",
      newOrder
    });
  } catch (err) {
    console.error(err);
    res.status(403).json({
      status: 403,
      message: "You don't have enough privilege"
    });
  }
};

exports.listAllOrders = async(req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      status: 200,
      message: "Order created successfully",
      success: true,
      orders,
    });
  } catch (err) {
    console.error(err);
    res.status(403).json({ 
      status: 403,
      error: "You don't have enough privilege"
    })
  }
};

exports.getOrderByID = async(req, res) => {
  try{
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    if(!order) {
      return res.status(404).json({
        status: 404,
        message: "Order not found",
      });
    }
    res.status(200).json({
      status: 200,
      success: true,
      order
    });
}catch (err){
  console.err(err);
  res.status(403).json({
    status: 403,
    message: "You don't have enough privilege"
  })
};
}

exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    
    if (!order) {
      return res.status(404).json({
        status : 404,
        message: "Invalid order id",
      })
    }

    return res.status(200).json({
      status: 200,
      message: "Order status updated successfully"
    })
    
  } catch (error) {
    console.error(err);
    res.status(403).json({
      status: 403,
      message: error.message

    });
  }
}











// exports.getOrderByID = async (req, res, next) => {
//     const orders = await Order.find();

//     let totalAmount = 0;

//     orders.forEach((order) => {
//         totalAmount += order.cart_total_price;
//     });

//     res.status(200).json({
//         success: true,
//         totalAmount,
//         orders,
//     });
// };

// exports.updateOrder = async (req, res, next) => {
//     const order = await Order.findById(req.params.id);
//     if (!order) {
//         return res.status(404).json({ success: false, message: "Order not found with this Id" });
//     }

//     if (order.status === "Delivered") {
//         return res.status(400).json({ success: false, message: "You have already delivered this order" });
//     }

//     if (req.body.status === "Shipped") {
//         for (const o of order.order_items) {
//             await updateStock(o.product, o.quantity);
//         }
//     }
//     order.status = req.body.status;
//     if (req.body.status === "Delivered") {
//         order.deliveredAt = Date.now();
//     }

//     await order.save({ validateBeforeSave: false });
//     res.status(200).json({
//         success: true,
//     });
// };

// async function updateStock(id, quantity) {
//     const product = await Product.findById(id);

//     product.Stock -= quantity;

//     await product.save({ validateBeforeSave: false });
// }
