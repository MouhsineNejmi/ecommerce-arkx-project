const router = require('express').Router();
const customerRoutes = require('./customer.routes');
const errorHanlderMiddleware = require('../middlewares/errorHandler.middleware');

router.use(errorHanlderMiddleware);

router.use('/customers', customerRoutes);

module.exports = router;
