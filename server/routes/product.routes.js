const router = require("express").Router();
const { addProduct } = require("../controllers/Product.controller");


router.post("/", addProduct);

module.exports = router;
