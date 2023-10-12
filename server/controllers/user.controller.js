const { genSalt, hash } = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');


exports.userAuthentication = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = {name: username, password: password}
  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.JWT_SECRET_KEY_USER)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
}
function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET_KEY_USER, { expiresIn: '1d' });
}


exports.userRegister = async (req, res, next) => {
    const { firstName, lastName, email, username, password } = req.body;
  
    try {
      const salt = await genSalt(12);
      const hashedPassword = await hash(password, salt);
      const newUser = await User.create({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
        password: hashedPassword,
        role: 'user',
        creation_date: Date.now(),
        last_login: Date.now(),
        last_update: null,
        active: true,
      });
  
      return res.json({
        status: 201,
        message: 'User created successfully',
        customer: newUser,
      });
    } catch (error) {
      next(error);
    }
};


exports.getAllUserList = (req, res) =>{

};

exports.getUserById = (req, res) =>{

};

exports.searchUser = (req, res) =>{

};

exports.updateUserData = (req, res) =>{

};

exports.deleteUser = (req, res) =>{

};


