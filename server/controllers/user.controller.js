const User = require('../models/user.model');

exports.getAllUsers = async (req, res, next) => {
  const sort = req.query.sort || 'desc';
  const page = req.query.page >= 1 ? req.query.page : 1;
  const resultsPerPage = 10;

  try {
    const users = await User.find()
      .sort({ username: sort.toLowerCase() })
      .skip((page - 1) * resultsPerPage)
      .limit(page * resultsPerPage);

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.searchUser = async (req, res) => {
  const query = req.query.query;
  const sort = req.query.sort || 'desc';
  const page = req.query.page >= 1 ? req.query.page : 1;
  const resultsPerPage = 10;

  try {
    const users = await User.findOne({ username: query })
      .sort({ username: sort.toLowerCase() })
      .skip((page - 1) * resultsPerPage)
      .limit(page * resultsPerPage);

    return res.status(200).json({
      data: users,
    });
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: "You don't have enough priviliege.",
    });
  }
};

exports.updateUserData = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, username, email, password, role } = req.body;

  try {
    const updatedFields = {
      first_name,
      last_name,
      username,
      email,
      password,
      role,
      last_update: Date.now(),
    };

    const user = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'users not found.' });
    }

    return res
      .status(204)
      .json({ status: 204, message: 'User updated successfully.' });
  } catch (error) {
    return res
      .status(403)
      .json({ status: 403, message: "You don't have enough privilege." });
  }
};

exports.deleteUserAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'users not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res
      .status(403)
      .json({ status: 403, message: "You don't have enough privilege." });
  }
};