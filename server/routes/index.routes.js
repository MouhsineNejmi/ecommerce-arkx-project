const router = require('express').Router();
const customerRoutes = require('./customer.routes');
const userRoutes = require('./user.routes');
const orderRoutes = require('./order.routes')
const errorHanlderMiddleware = require('../middlewares/errorHandler.middleware');

router.use(errorHanlderMiddleware);

router.use('/customers', customerRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes)

module.exports = router;
