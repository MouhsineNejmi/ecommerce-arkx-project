const jwt = require('jsonwebtoken');

const isSeller = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (!accessToken) {
      return res
        .status(403)
        .json({ status: 403, message: 'Access Denied. No token provided.' });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY);

    if (decoded.accountType !== 'seller') {
      return res.status(403).json({
        status: 403,
        message: 'Only customers can access this endpoint',
      });
    }

    req.seller = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: error?.message });
  }
};

module.exports = { isSeller };
