const router = require('express').Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const customerRoutes = require('./customer.routes');
const sellerRoutes = require('./seller.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/customers', customerRoutes);
router.use('/sellers', sellerRoutes);

module.exports = router;
