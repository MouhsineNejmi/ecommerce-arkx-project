const router = require('express').Router();
const productRoutes=require('./product.routes')


router.use('/products',productRoutes)




module.exports =router;