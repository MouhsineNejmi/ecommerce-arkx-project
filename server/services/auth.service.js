const User = require('../models/user.model');
const Customer = require('../models/customer.model');
const { signJwt } = require('../utils/jwt.utils');

exports.createUser = async (input) => {
  const user = await User.create(input);
  return user;
};

exports.createCustomer = async (input) => {
  const customer = await Customer.create(input);
  return customer;
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
