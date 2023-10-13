const router = require('express').Router();

const {
  getAllCustomers,
  searchCustomer,
  getCustomerById,
  updateCustomerData,
  deleteCustomerAccount,
  getCustomerProfile,
} = require('../controllers/customer.controller');
const {
  isUserAdminOrManager,
  isUserAdmin,
} = require('../middlewares/user.middleware');

router.get('/', isUserAdminOrManager, getAllCustomers);

module.exports = router;
