const router = require('express').Router();
const { uploadMultipleImages } = require('../upload/mutliple.upload');

const {
  addProduct,
  listProduct,
  deleteProduct,
  updateProduct,
  getProductByID,
  searchforProduct,
} = require('../controllers/product.controller');

const deserializeUser = require('../middlewares/deserialize-user.middleware');
const requireUser = require('../middlewares/require-user.middleware');
const { restrictTo } = require('../middlewares/restrict-to.middleware');

router.use(deserializeUser, requireUser);

router.post(
  '/',
  restrictTo('admin', 'manager'),
  uploadMultipleImages,
  addProduct
);
router.get('/', searchforProduct);
router.get('/', listProduct);
router.get('/:id', getProductByID);
router.delete('/:id', restrictTo('admin', 'manager'), deleteProduct);
router.put(
  '/:id',
  restrictTo('admin', 'manager'),
  uploadMultipleImages,
  updateProduct
);

module.exports = router;
