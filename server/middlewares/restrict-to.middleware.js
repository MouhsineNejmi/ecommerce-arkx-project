const AppError = require('../utils/app-error.utils');

const restrictTo =
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

module.exports = restrictTo;
