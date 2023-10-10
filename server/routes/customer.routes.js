const router = require('express').Router();
const { body } = require('express-validator');

const {
  registerCustomer,
  loginCustomer,
  getAllCustomers,
  searchCustomer,
  getCustomerById,
  updateCustomerData,
  deleteCustomerAccount,
  getCustomerProfile,
} = require('../controllers/customer.controller');

router.post(
  '/',
  [body('email').isEmail(), body('password').isLength({ min: 6, max: 30 })],
  registerCustomer
);

router.post('/login', loginCustomer);

module.exports = router;
