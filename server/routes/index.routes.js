const router = require('express').Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const errorHanlderMiddleware = require('../middlewares/errorHandler.middleware');

router.use(errorHanlderMiddleware);

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
