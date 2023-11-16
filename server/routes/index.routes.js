const router = require('express').Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const customerRoutes = require('./customer.routes');
const sellerRoutes = require('./seller.routes');
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes');
const categoriesRoutes = require('./category.routes');
const subCategoriesRoutes = require('./subcategories.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/customers', customerRoutes);
router.use('/sellers', sellerRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/categories', categoriesRoutes);
router.use('/subcategories', subCategoriesRoutes);

module.exports = router;
