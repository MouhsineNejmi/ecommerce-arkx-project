const router = require('express').Router();

const {
  getAllCustomers,
  getCustomerById,
  searchCustomer,
  updateCustomerData,
  deleteCustomerAccount,
  getCustomerProfile,
} = require('../controllers/customer.controller');
const {
  isUserAdminOrManager,
  isUserAdmin,
} = require('../middlewares/user.middleware');

router.get('/', isUserAdminOrManager, getAllCustomers);
router.get('/customer/:id', isUserAdminOrManager, getCustomerById);

module.exports = router;
