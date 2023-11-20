const router = require('express').Router();
const {
  addProduct,
  listProduct,
  deleteProduct,
  updateProduct,
  getProductID,
  searchforProduct,
} = require('../controllers/product.controller');

const deserializeUser = require('../middlewares/deserialize-user.middleware');
const requireUser = require('../middlewares/require-user.middleware');
const { restrictTo } = require('../middlewares/restrict-to.middleware');

router.use(deserializeUser, requireUser);

router.post('/', restrictTo('admin', 'manager'), addProduct);
router.get('/', restrictTo('admin', 'manager'), listProduct);
router.get('/:name', restrictTo('admin', 'manager'), searchforProduct);
router.get('/:id', restrictTo('admin', 'manager'), getProductID);
router.delete('/:id', restrictTo('admin', 'manager'), deleteProduct);
router.put('/:id', restrictTo('admin', 'manager'), updateProduct);

module.exports = router;
