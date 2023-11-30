const User = require('../models/user.model');

exports.findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

exports.findAllUsers = async () => {
  return await User.find();
};

exports.findUser = async (query, options = {}) => {
  return await User.findOne(query, {}, options).select('+password');
};
