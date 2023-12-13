const Payment = require('../models/payment.model');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const DESIGN_ELEGANCE_DOMAIN = 'http://localhost:5173';

exports.createCheckoutSession = async (req, res, next) => {
  const { cartItems } = req.body;

  try {
    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1OKeBDLKD6VHuc9nc3acLlfP' },
        { shipping_rate: 'shr_1OKeC3LKD6VHuc9n3G5txRgD' },
      ],
      line_items: cartItems.map(({ product, quantity }) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.product_name,
            images: product.product_images,
          },
          unit_amount: product.price * 100, // It has to be in cent
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity,
      })),
      success_url: `${DESIGN_ELEGANCE_DOMAIN}/checkout?success=true`,
      cancel_url: `${DESIGN_ELEGANCE_DOMAIN}/checkout?canceled=true`,
    };

    const session = await stripe.checkout.sessions.create(params);

    res.status(200).json({
      status: 'success',
      data: session,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createPaymentIntent = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'usd',
      amount: req.body.amount,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      status: 'success',
      data: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createPayment = async (req, res, next) => {
  try {
    const payment = await Payment.create(req.body);

    res.status(200).json({
      status: 'success',
      data: payment,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find();

    res.status(200).json({
      status: 'success',
      data: payments,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPaymentById = async (req, res, next) => {
  const { paymentId } = req.params;

  try {
    const payment = await Payment.findById(paymentId);

    res.status(200).json({
      status: 'success',
      data: payment,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
