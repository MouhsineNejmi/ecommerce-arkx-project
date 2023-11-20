const AppError = require('../utils/app-error.utils');

exports.restrictTo =
  (...allowedRoles) =>
  (req, res, next) => {
    const user = res.locals.user;

    if (!allowedRoles.includes(user.role)) {
      return next(
        new AppError('You are not allowed to perform this action', 403)
      );
    }

    next();
  };

exports.restrictToCustomer = (req, res, next) => {
  const user = res.locals.user;

  if (user.account_type !== 'customer') {
    return next(
      new AppError('You are not allowed to perform this action', 403)
    );
  }

  next();
};
