const router = require('express').Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const orderRoutes = require('./order.routes')
const categories = require('./category.routes');
const subCategories = require('./subcategories.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/categories', categories);
router.use('/subcategories', subCategories);

module.exports = router;
