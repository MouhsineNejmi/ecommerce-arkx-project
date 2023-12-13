const router = require('express').Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const customerRoutes = require('./customer.routes');
const favoritesRoutes = require('./favorites.routes');
const productRoutes = require('./product.routes');
const uploadRoutes = require('./upload.routes');
const orderRoutes = require('./order.routes');
const paymentRoutes = require('./payment.routes');
const categoriesRoutes = require('./category.routes');
const cartRoutes = require('./cart.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/customers', customerRoutes);
router.use('/products', productRoutes);
router.use('/upload', uploadRoutes);
router.use('/orders', orderRoutes);
router.use('/payment', paymentRoutes);
router.use('/categories', categoriesRoutes);
router.use('/cart', cartRoutes);
router.use('/favorites', favoritesRoutes);

module.exports = router;
