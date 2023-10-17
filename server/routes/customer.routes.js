const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  getAllCustomers,
  getCustomerById,
  searchCustomer,
  updateCustomerData,
  deleteCustomerAccount,
  getCustomerProfile,
} = require('../controllers/customer.controller');
const { isUserAdminOrManager } = require('../middlewares/user.middleware');
const { isCustomer } = require('../middlewares/customer.middleware');

router.get('/', isUserAdminOrManager, getAllCustomers);
router.get('/customer/:id', isUserAdminOrManager, getCustomerById);
router.get('/customer', isUserAdminOrManager, searchCustomer);
router.put(
  '/customer/:id',
  isUserAdminOrManager,
  upload.single('image'),
  updateCustomerData
);
router.delete('/delete', isCustomer, deleteCustomerAccount);
router.get('/profile', isCustomer, getCustomerProfile);
router.patch('/profile/update', isCustomer, updateCustomerData);

module.exports = router;