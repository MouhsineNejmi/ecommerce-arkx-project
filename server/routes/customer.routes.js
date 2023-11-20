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
  updateCustomer,
} = require('../controllers/customer.controller');

const deserializeUser = require('../middlewares/deserialize-user.middleware');
const requireUser = require('../middlewares/require-user.middleware');
const {
  restrictTo,
  restrictToCustomer,
} = require('../middlewares/restrict-to.middleware');

router.use(deserializeUser, requireUser);

router.get('/', restrictTo('admin', 'manager'), getAllCustomers);
router.get('/customer/:id', restrictTo('admin', 'manager'), getCustomerById);
router.get('/customer', restrictTo('admin', 'manager'), searchCustomer);
router.get('/profile', restrictToCustomer, getCustomerProfile);
router.put('/profile/update', restrictToCustomer, updateCustomer);
router.put('/customer/:id', restrictTo('admin', 'manager'), updateCustomer);
router.delete('/delete', restrictToCustomer, deleteCustomerAccount);

module.exports = router;
