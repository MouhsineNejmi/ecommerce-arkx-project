const User = require('../models/user.model');
const { signJwt } = require('../utils/jwt.utils');

exports.createUser = async (input) => {
  const user = await User.create(input);
  return user;
};

exports.findUserById = async (id) => {
  const user = await User.findById(id).lean();
  return user;
};

exports.findAllUsers = async () => {
  return await User.find();
};

exports.findUser = async (query, options = {}) => {
  return await User.findOne(query, {}, options).select('+password');
};

exports.signToken = async (user) => {
  const access_token = signJwt(
    { sub: user._id },
    {
      expiresIn: '1d',
    }
  );

  return { access_token };
};
