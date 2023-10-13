const router = require('express').Router();
const passport = require('passport');
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

router.post('/login', passport.authenticate('customer-local'), loginCustomer);

module.exports = router;
