const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

exports.getCartItems = async (req, res) => {
  const customer = res.locals.user;

  const cart = await Cart.findOne({ customer_id: customer._id }).populate(
    'items.product'
  );

  return res.status(200).json({ status: 'success', data: cart });
};

exports.addToCart = async (req, res) => {
  const productId = req.body.productId;
  const customer_id = res.locals.user._id;
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const cart = await Cart.findOne({ customer_id });

  if (!cart) {
    const newCart = await Cart.create({
      customer_id,
      items: [{ product: product._id, quantity: 1 }],
    });

    return res.status(200).json({
      status: 'success',
      message: 'Item added successfully',
      data: newCart,
    });
  } else {
    const existingItem = cart.items.find((item) =>
      item.product.equals(product._id)
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ product: product._id, quantity: 1 });
    }

    await cart.save();

    return res.status(200).json({
      status: 'success',
      message: 'Item added successfully',
      data: cart,
    });
  }
};

exports.decreaseQuantity = async (req, res) => {
  const productId = req.body.productId;
  const customer_id = res.locals.user._id;

  const cart = await Cart.findOne({ customer_id });

  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  // Find the item in the cart
  const itemIndex = cart.items.findIndex((item) =>
    item.product.equals(productId)
  );

  if (itemIndex !== -1) {
    // If the item exists, decrease the quantity
    const item = cart.items[itemIndex];

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      // If the quantity is 1, remove the item from the cart
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
  }

  return res.status(200).json({
    status: 'success',
    message: 'Quantity decreased successfully',
    data: cart,
  });
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const customer_id = res.locals.user._id;

  const cart = await Cart.findOne({ customer_id });

  if (!cart) {
    return res.status(404).json({ error: 'Cart not found' });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex !== -1) {
    cart.items.splice(itemIndex, 1);
    await cart.save();
  }

  return res.status(200).json({
    status: 'success',
    message: 'Item removed successfully',
    data: cart,
  });
};

exports.clearCart = async (req, res) => {
  const customer_id = res.locals.user._id;

  try {
    const cart = await Cart.findOne({ customer_id });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = [];

    await cart.save();

    return res.status(200).json({
      status: 'success',
      message: 'Cart cleared successfully',
      data: cart,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
