const passport = require('passport');
const { genSalt, hash } = require('bcryptjs');

const User = require('../models/user.model');
const { generateAccessToken } = require('../helpers/authHelpers');

exports.registerUser = async (req, res, next) => {
  const { firstName, lastName, email, role, username, password } = req.body;

  try {
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);
    const newUser = await User.create({
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

    return res.json({
      status: 201,
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return next(err);
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.json({ status: 401, message: 'Invalid credentials' });
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
