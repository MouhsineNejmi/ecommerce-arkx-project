const { compare } = require('bcryptjs');

const verifyPassword = async (password, hashedPassword) => {
  const isMatched = await compare(password, hashedPassword);
  return isMatched;
};

module.exports = verifyPassword;
