const User = require('../models/user.model');

exports.getAllUsers = async (req, res, next) => {
  const sort = req.query.sort || 'desc';
  const page = req.query.page >= 1 ? req.query.page : 1;
  const resultsPerPage = 10;

  try {
    const users = await User.find()
      .sort({ name: sort.toLowerCase() })
      .skip((page - 1) * resultsPerPage)
      .limit(page * resultsPerPage);

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

exports.searchUser = (req, res) => {};

exports.getUserById = (req, res) => {};
exports.updateUserData = (req, res) => {};
exports.deleteUserAccount = (req, res) => {};
exports.getUserProfile = (req, res) => {};
