const { genSalt, hash, compare } = require('bcryptjs');

const { uploadImageToS3, getImageLink } = require('../utils/aws.utils');
const AppError = require('../utils/app-error.utils');

const { createUser, findUser, signToken } = require('../services/user.service');

const accessTokenCookieOptions = {
  expires: new Date(Date.now() * 86400 * 1000),
  maxAge: 86400 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

if (process.env.NODE_ENV === 'production')
  accessTokenCookieOptions.secure = true;

exports.registerHandler = async (req, res, next) => {
  const { account_type, password } = req.body;

  try {
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);

    let newUser = {};

    if (req.file)
      if (account_type === 'user') {
        newUser = await createUser({
          ...req.body,
          account_type,
          password: hashedPassword,
          valid_account: false,
          active: true,
          creation_date: Date.now(),
          last_login: Date.now(),
        });
      }
    // else if (accountType === 'customer') {
    //   newUser = await Customer.create({
    //     image_name: key,
    //     first_name: firstName,
    //     last_name: lastName,
    //     email,
    //     username,
    //     password: hashedPassword,
    //     account_type,
    //     creation_date: Date.now(),
    //     last_login: Date.now(),
    //     valid_account: false,
    //     active: true,
    //   });
    // } else if (accountType === 'seller') {
    //   newUser = await Seller.create({
    //     image_name: key,
    //     first_name: firstName,
    //     last_name: lastName,
    //     email,
    //     username,
    //     password: hashedPassword,
    //     accountType,
    //     creation_date: Date.now(),
    //     last_login: Date.now(),
    //     last_update: null,
    //     active: true,
    //   });
    // }

    return res.json({
      status: 'success',
      message: `${account_type.charAt(0).toUpperCase()} created successfully`,
      data: { user: newUser },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exist',
      });
    }
    next(error);
  }
};

exports.loginHandler = async (req, res, next) => {
  try {
    const user = await findUser({ username: req.body.username });

    // Check if user exist and password is correct
    if (!user || !compare(user.password, req.body.password)) {
      return next(new AppError('Invalid username or password', 401));
    }

    // Create an Access Token
    const { access_token } = await signToken(user);

    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: 'success',
      user,
      access_token,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (res) => {
  res.cookie('access_token', '', { maxAge: 1 });
  res.cookie('logged_in', '', {
    maxAge: 1,
  });
};

exports.logoutHandler = (req, res, next) => {
  try {
    logout(res);
    return res.status(200).json({
      status: 'success',
      message: 'You logged out successfully.',
    });
  } catch (error) {
    next(error);
  }
};
