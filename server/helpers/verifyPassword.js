const { compare } = require('bcryptjs');

const verifyPassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};

module.exports = verifyPassword;
