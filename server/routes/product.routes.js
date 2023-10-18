const router = require("express").Router();
const { addProduct,listProduct, deleteProduct,updateProduct,getProductID} = require("../controllers/Product.controller");


router.post("/", addProduct);
router.get("/", listProduct);
router.get("/:id", getProductID);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);


module.exports = router;
