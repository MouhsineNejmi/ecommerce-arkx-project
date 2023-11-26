const Customer = require('../models/customer.model');

exports.findAllCustomers = async ({ sort, page, resultsPerPage }) => {
  const customers = await Customer.find()
    .sort({ username: sort.toLowerCase() })
    .skip((page - 1) * resultsPerPage)
    .limit(page * resultsPerPage);

  return customers;
};

exports.findCustomerById = async (id) => {
  const customer = await Customer.findById(id);
  return customer;
};

exports.findCustomer = async ({ query, sort, page, resultsPerPage }) => {
  const customer = Customer.findOne(query)
    .sort({ username: sort.toLowerCase() })
    .skip((page - 1) * resultsPerPage)
    .limit(page * resultsPerPage);

  return customer;
};

exports.findCustomerByQuery = async (query, options = {}) => {
  const customer = await Customer.findOne(query, {}, options).select(
    '+password'
  );

  return customer;
};

exports.updateCustomerData = async (id, input) => {
  const customer = await Customer.findByIdAndUpdate(id, input);
  return customer;
};

exports.customerProfile = async (id) => {
  const customer = await Customer.findById(id);
  return customer;
};
