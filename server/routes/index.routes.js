const router = require("express").Router();
const customerRoutes = require("./customer.routes");
const productRoutes = require("./product.routes");
const errorHanlderMiddleware = require("../middlewares/errorHandler.middleware");

router.use(errorHanlderMiddleware);

router.use("/customers", customerRoutes);
router.use("/products", productRoutes);

module.exports = router;
