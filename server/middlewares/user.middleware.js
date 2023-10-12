const jwt = require('jsonwebtoken');

const isUserAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) {
      return res
        .status(403)
        .json({ message: 'Access Denied. No token provided.' });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: error.message });
  }
};

const isUserAdminOrManager = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) {
      return res
        .status(403)
        .json({ message: 'Access Denied. No token provided.' });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);

    if (decoded.role !== 'admin' && decoded.role !== 'manager') {
      return res.status(403).json({
        message: "Access Denied. You don't have enough priviliege.",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const isUserAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) {
      return res
        .status(403)
        .json({ message: 'Access Denied. No token provided.' });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);

    if (decoded.role !== 'admin' && decoded.role === 'manager') {
      return res.status(403).json({
        message: "Access Denied. You don't have enough priviliege.",
      });
    }

    if (decoded.role === 'admin') {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: error.message });
  }
};

module.exports = { isUserAuthenticated, isUserAdminOrManager, isUserAdmin };
