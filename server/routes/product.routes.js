const router = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
const restrictTo = require('../middlewares/restrict-to.middleware');

router.use(deserializeUser, requireUser);

router.post(
    '/',
    restrictTo('admin', 'manager'),
    upload.single('product_image'),
    addProduct
);
router.get('/', restrictTo('admin', 'manager'), listProduct);
router.get('/', restrictTo('admin', 'manager'), searchforProduct);
router.get('/:id', restrictTo('admin', 'manager'), getProductByID);
router.delete('/:id', restrictTo('admin', 'manager'), deleteProduct);
router.put(
    '/:id',
    restrictTo('admin', 'manager'),
    upload.single('product_image'),
    updateProduct
);

module.exports = router;
