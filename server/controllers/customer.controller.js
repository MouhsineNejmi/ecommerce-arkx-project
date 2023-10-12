const { genSalt, hash } = require('bcryptjs');
const Customer = require('../models/customer.model');

exports.loginCustomer = (req, res) => {};

exports.registerCustomer = async (req, res, next) => {
  const { firstName, lastName, email, username, password } = req.body;

  try {
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);
    const newCustomer = await Customer.create({
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password: hashedPassword,
      role: 'customer',
      creation_date: Date.now(),
      last_login: Date.now(),
      last_update: null,
      active: true,
    });

    return res.json({
      status: 201,
      message: 'Customer created successfully',
      customer: newCustomer,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllCustomers = (req, res) => {};
exports.searchCustomer = (req, res) => {};
exports.getCustomerById = (req, res) => {};
exports.updateCustomerData = (req, res) => {};
exports.deleteCustomerAccount = (req, res) => {};
exports.getCustomerProfile = (req, res) => {};
