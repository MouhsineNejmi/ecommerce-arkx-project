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
const { isUserAdmin } = require('../middlewares/user.middleware');
const { isSeller } = require('../middlewares/seller.middleware');

router.get('/', isUserAdmin, getAllSellers);
router.get('/seller/:id', isUserAdmin, getSellerById);
router.get('/seller', isUserAdmin, searchSeller);
router.put(
  '/seller/:id',
  isUserAdmin,
  upload.single('image'),
  updateSellerData
);
router.delete('/delete', isSeller, deleteSellerAccount);
router.get('/profile', isSeller, getSellerProfile);
router.patch('/profile/update', isSeller, updateSellerData);

module.exports = router;
