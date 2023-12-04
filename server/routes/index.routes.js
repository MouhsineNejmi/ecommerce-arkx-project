const router = require('express').Router();
const multer = require('multer');

// const { uploadSingleImage } = require('../upload/single.upload');

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const customerRoutes = require('./customer.routes');
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes');
const categoriesRoutes = require('./category.routes');
// const subCategoriesRoutes = require('./subcategories.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/customers', customerRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/categories', categoriesRoutes);
// router.use('/subcategories', subCategoriesRoutes);

// router.post('/upload', upload.single('image'), async (req, res, next) => {
//   try {
//     const b64 = Buffer.from(req.file.buffer).toString('base64');
//     let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
//     console.log(handleUpload);
//     const cldRes = await handleUpload(dataURI);
//     res.json(cldRes);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

module.exports = router;
