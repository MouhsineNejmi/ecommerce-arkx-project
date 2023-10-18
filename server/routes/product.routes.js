const router = require("express").Router();
const { addProduct,listProduct, deleteProduct,updateProduct,getProductID,searchforProduct} = require("../controllers/Product.controller");


router.post("/", addProduct);
router.get("/", listProduct);
router.get("/:name", searchforProduct); 
router.get("/:id", getProductID);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);


module.exports = router;
