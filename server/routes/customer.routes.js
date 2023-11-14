const router = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  getAllCustomers,
  getCustomerById,
  searchCustomer,
  updateCustomerData,
  deleteCustomerAccount,
  getCustomerProfile,
} = require('../controllers/customer.controller');
const { isCustomer } = require('../middlewares/customer.middleware');

const deserializeUser = require('../middlewares/deserialize-user.middleware');
const requireUser = require('../middlewares/require-user.middleware');
const restrictTo = require('../middlewares/restrict-to.middleware');

router.use(deserializeUser, requireUser);

router.get('/', restrictTo('admin', 'manager'), getAllCustomers);
router.get('/customer/:id', restrictTo('admin', 'manager'), getCustomerById);
router.get('/customer', restrictTo('admin', 'manager'), searchCustomer);
router.put(
  '/customer/:id',
  restrictTo('admin', 'manager'),
  upload.single('image'),
  updateCustomerData
);
router.delete('/delete', isCustomer, deleteCustomerAccount);
router.get('/profile', isCustomer, getCustomerProfile);
router.put('/profile/update', isCustomer, updateCustomerData);

module.exports = router;
