const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/auth');
const User = require('../models/User');


async function registerUser(username, email, password) {
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new Error('User already exists');
    }

    user = new User({
      first_name,
      last_name,
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return user;
  } catch (error) {
    throw error;
  }
}


async function loginUser(email, password) {
  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return user;
  } catch (error) {
    throw error;
  }
}


function generateToken(user) {
  const payload = {
    user: {
      id: user.id,
    },
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
  registerUser,
  loginUser,
  generateToken,
};
