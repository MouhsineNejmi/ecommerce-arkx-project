const jwt = require('jsonwebtoken');

exports.signJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {
    expiresIn: '1d',
  });
};

exports.verifyJwt = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
  } catch (error) {
    return null;
  }
};
