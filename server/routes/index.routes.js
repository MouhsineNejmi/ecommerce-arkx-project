const router = require('express').Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const customerRoutes = require('./customer.routes');
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes');
const categoriesRoutes = require('./category.routes');
const subCategoriesRoutes = require('./subcategories.routes');

// const multer = require('multer');
// const upload = multer();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/customers', customerRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/categories', categoriesRoutes);
router.use('/subcategories', subCategoriesRoutes);

module.exports = router;

// router.post('/upload', upload.single('image'), async (req, res, next) => {
//   const data = {};
//   const file = req.file;

//   try {
//     if (file) {
//       const link = await uploadImageToS3(file);
//       data.image_link = link;
//     }

//     res.status(200).json({
//       status: 'success',
//       data,
//     });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });
