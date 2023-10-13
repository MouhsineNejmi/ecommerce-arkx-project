const passport = require('passport');
const { genSalt, hash } = require('bcryptjs');

const User = require('../models/user.model');
const Customer = require('../models/customer.model');
// const Seller = require('../models/seller.model');

const { generateAccessToken } = require('../helpers/authHelpers');

exports.register = async (req, res) => {
  const { firstName, lastName, email, accountType, role, username, password } =
    req.body;

  try {
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);

    let newAccount = {};

    if (accountType === 'user') {
      newAccount = await User.create({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password: hashedPassword,
        role,
        creation_date: Date.now(),
        last_login: Date.now(),
        last_update: null,
        active: true,
      });
    } else if (accountType === 'customer') {
      newAccount = await Customer.create({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password: hashedPassword,
        creation_date: Date.now(),
        last_login: Date.now(),
        valid_account: false,
        active: true,
      });
    }

    return res.json({
      status: 201,
      message: `${accountType.charAt(0).toUpperCase()} created successfully`,
      data: newAccount,
    });
  } catch (error) {
    return res.status(401).json({ status: 401, message: error.message });
  }
};

exports.login = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res
        .json(401)
        .json({
          status: 401,
          message: err.message || 'Invalid email or password',
        });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(401).json({ status: 401, message: err.message });
      }

      const accessToken = generateAccessToken({
        _id: user._id,
        role: user.role,
      });

      res.cookie('accessToken', accessToken);

      res.status(200).json({ status: 200, accessToken, user });
    });
  })(req, res);
};
