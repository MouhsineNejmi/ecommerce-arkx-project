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

    if (decoded.role !== 'admin') {
      return res.status(403).json({
        message: 'Access Denied. You should be admin to access this route.',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isUserAuthenticated, isUserAdmin };
