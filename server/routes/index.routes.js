const router = require('express').Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const orderRoutes = require('./order.routes')

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes)

module.exports = router;
