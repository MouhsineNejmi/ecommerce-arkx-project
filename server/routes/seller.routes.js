const router = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  getAllSellers,
  getSellerById,
  searchSeller,
  updateSellerData,
  deleteSellerAccount,
  getSellerProfile,
} = require('../controllers/seller.controller');
const deserializeUser = require('../middlewares/deserialize-user.middleware');
const requireUser = require('../middlewares/require-user.middleware');
const restrictTo = require('../middlewares/restrict-to.middleware');
const { isSeller } = require('../middlewares/seller.middleware');

router.use(deserializeUser, requireUser);

router.get('/', restrictTo('admin'), getAllSellers);
router.get('/seller/:id', restrictTo('admin'), getSellerById);
router.get('/seller', restrictTo('admin'), searchSeller);
router.put(
  '/seller/:id',
  restrictTo('admin'),
  upload.single('image'),
  updateSellerData
);
router.delete('/delete', isSeller, deleteSellerAccount);
router.get('/profile', isSeller, getSellerProfile);
router.put('/profile/update', isSeller, updateSellerData);

module.exports = router;
