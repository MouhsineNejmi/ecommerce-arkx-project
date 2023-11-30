const { findUserById } = require('../services/user.service');
const { findCustomerById } = require('../services/customer.service');

const { verifyJwt } = require('../utils/jwt.utils');
const AppError = require('../utils/app-error.utils');

const deserializeUser = async (req, res, next) => {
  try {
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) {
      return next(new AppError('You are not logged in', 401));
    }

    const decoded = verifyJwt(access_token);

    if (!decoded) {
      return next(new AppError("Invalid token or user doesn't exist", 401));
    }

    const user =
      decoded.account_type === 'user'
        ? await findUserById(decoded.sub)
        : await findCustomerById(decoded.sub);

    if (!user) {
      return next(new AppError('User with that token no longer exist', 401));
    }

    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = deserializeUser;
