const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS_SECRET_KEY, {
    expiresIn: '1d',
  });
};

module.exports = { generateAccessToken };
