const Seller = require('../models/seller.model');

exports.getAllSellers = async (req, res) => {
  const sort = req.query.sort || 'desc';
  const page = req.query.page >= 1 ? req.query.page : 1;
  const resultsPerPage = 10;

  try {
    const sellers = await Seller.find()
      .sort({ username: sort.toLowerCase() })
      .skip((page - 1) * resultsPerPage)
      .limit(page * resultsPerPage);

    return res.status(200).json({
      status: 200,
      data: sellers,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      status: 403,
      message: error?.message,
    });
  }
};

// Admin see seller info
exports.getSellerById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const seller = await Seller.findById(id);

    if (!seller) {
      return res.status(404).json({
        status: 404,
        message: 'Seller not found.',
      });
    }

    return res.status(200).json({
      status: 200,
      data: seller,
    });
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: error?.message,
    });
  }
};

// Admin search seller
exports.searchSeller = async (req, res) => {
  const query = req.query.query;
  const sort = req.query.sort || 'desc';
  const page = req.query.page >= 1 ? req.query.page : 1;
  const resultsPerPage = 10;

  try {
    const seller = await Seller.findOne({ username: query })
      .sort({ username: sort.toLowerCase() })
      .skip((page - 1) * resultsPerPage)
      .limit(page * resultsPerPage);

    return res.status(200).json({
      status: 200,
      data: seller,
    });
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: error?.message,
    });
  }
};

// Admin & Seller => update seller info
exports.updateSellerData = async (req, res) => {
  const id = req.params.id || req.seller._id;
  const { first_name, last_name, username, email, password, role } = req.body;

  try {
    const updatedFields = {
      first_name,
      last_name,
      username,
      email,
      password,
      last_update: Date.now(),
    };

    const seller = await Seller.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!seller) {
      return res.status(404).json({ status: 404, message: 'users not found.' });
    }

    return res
      .status(200)
      .json({ status: 200, message: 'Seller updated successfully.' });
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: error?.message,
    });
  }
};

// Admin delete seller
exports.deleteSellerAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await Seller.findByIdAndDelete(id);

    if (!seller) {
      return res.status(404).json({ status: 404, message: 'Seller not found' });
    }

    return res
      .status(200)
      .json({ satus: 200, message: 'Seller deleted successfully' });
  } catch (error) {
    return res.status(403).json({ status: 403, message: error?.message });
  }
};

exports.getSellerProfile = async (req, res) => {
  const id = req.customer._id;

  try {
    const seller = await Seller.findById(id);

    if (!seller) {
      return res
        .status(404)
        .json({ status: 404, message: 'Customer not found' });
    }

    return res.status(200).json({ status: 200, data: seller });
  } catch (error) {
    return res.status(403).json({ status: 403, message: error?.message });
  }
};
