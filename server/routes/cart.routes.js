const router = require('express').Router();

const {
  getCartItems,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = require('../controllers/cart.controller');

const deserializeUser = require('../middlewares/deserialize-user.middleware');
const requireUser = require('../middlewares/require-user.middleware');
const { restrictToCustomer } = require('../middlewares/restrict-to.middleware');

router.use(deserializeUser, requireUser, restrictToCustomer);

router.get('/', getCartItems);
router.post('/add', addToCart);
router.delete('/decrease', decreaseQuantity);
router.delete('/remove/:productId', removeFromCart);
router.delete('/clear-cart', clearCart);

module.exports = router;
