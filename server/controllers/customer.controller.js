const Customer = require('../models/customer.model');

exports.getAllCustomers = async (req, res) => {
  const sort = req.query.sort || 'desc';
  const page = req.query.page >= 1 ? req.query.page : 1;
  const resultsPerPage = 10;

  try {
    const users = await Customer.find()
      .sort({ username: sort.toLowerCase() })
      .skip((page - 1) * resultsPerPage)
      .limit(page * resultsPerPage);

    return res.status(200).json({
      data: users || [],
    });
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: error.message,
    });
  }
};

exports.getCustomerById = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        message: 'Customer not found.',
      });
    }

    return res.status(200).json({
      data: customer,
    });
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: error.message,
    });
  }
};

exports.searchCustomer = (req, res) => {};

exports.updateCustomerData = (req, res) => {};
exports.deleteCustomerAccount = (req, res) => {};
exports.getCustomerProfile = (req, res) => {};
