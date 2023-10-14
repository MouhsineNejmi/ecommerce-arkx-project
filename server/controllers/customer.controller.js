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
      status: 200,
      data: users || [],
    });
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: error?.message,
    });
  }
};

exports.getCustomerById = async (req, res) => {
  const { id } = req.params;

  try {
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        status: 404,
        message: 'Customer not found.',
      });
    }

    return res.status(200).json({
      status: 200,
      data: customer,
    });
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: error?.message,
    });
  }
};

exports.searchCustomer = async (req, res) => {
  const query = req.query.query;
  const sort = req.query.sort || 'desc';
  const page = req.query.page >= 1 ? req.query.page : 1;
  const resultsPerPage = 10;

  try {
    const customer = await Customer.findOne({ username: query })
      .sort({ username: sort.toLowerCase() })
      .skip((page - 1) * resultsPerPage)
      .limit(page * resultsPerPage);

    return res.status(200).json({
      status: 200,
      data: customer,
    });
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: error?.message,
    });
  }
};

exports.updateCustomerData = async (req, res) => {
  const id = req.params.id || req.customer._id;
  const { first_name, last_name, username, email, password } = req.body;

  try {
    const updatedFields = {
      first_name,
      last_name,
      username,
      email,
      password,
    };

    const customer = await Customer.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!customer) {
      return res
        .status(404)
        .json({ status: 404, message: 'customer not found.' });
    }

    return res
      .status(200)
      .json({ status: 200, message: 'Customer updated successfully.' });
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: error?.message,
    });
  }
};

exports.deleteCustomerAccount = async (req, res) => {
  const id = req.customer._id;

  try {
    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
      return res
        .status(404)
        .json({ status: 404, message: 'Customer not found' });
    }

    req.customer = null;

    return res
      .status(200)
      .json({ status: 200, message: 'Customer deleted successfully' });
  } catch (error) {
    return res.status(403).json({ status: 403, message: error?.message });
  }
};

exports.getCustomerProfile = async (req, res) => {
  const id = req.customer._id;

  try {
    const customer = await Customer.findById(id);

    if (!customer) {
      return res
        .status(404)
        .json({ status: 404, message: 'Customer not found' });
    }

    return res.status(200).json({ status: 200, data: customer });
  } catch (error) {
    return res.status(403).json({ status: 403, message: error?.message });
  }
};
