const router = require("express").Router();
const { addProduct,listProduct, deleteProduct,updateProduct,getProductID,searchforProduct} = require("../controllers/Product.controller");
const { isUserAdminOrManager } = require('../middlewares/user.middleware');



router.post("/", isUserAdminOrManager,addProduct);
router.get("/", isUserAdminOrManager,listProduct);
router.get("/:name", isUserAdminOrManager,searchforProduct); 
router.get("/:id", isUserAdminOrManager,getProductID);
router.delete("/:id", isUserAdminOrManager,deleteProduct);
router.put("/:id", isUserAdminOrManager,updateProduct);


module.exports = router;
