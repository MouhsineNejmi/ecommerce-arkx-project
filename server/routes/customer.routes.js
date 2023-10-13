const router = require('express').Router();

const {
  getAllCustomers,
  searchCustomer,
  getCustomerById,
  updateCustomerData,
  deleteCustomerAccount,
  getCustomerProfile,
} = require('../controllers/customer.controller');

module.exports = router;
