const deserialiseUser = require('../middlewares/deserialize-user.middleware');
const requireUser = require('../middlewares/require-user.middleware');

const {
  createCheckoutSession,
  createPaymentIntent,
  createPayment,
  getAllPayments,
} = require('../controllers/payment.controller');

const router = require('express').Router();

router.use(deserialiseUser, requireUser);

router.get('/', getAllPayments);
router.post('/create-payment-intent', createPaymentIntent);
router.post('/create-checkout-session', createCheckoutSession);
router.post('/create-payment', createPayment);

module.exports = router;
