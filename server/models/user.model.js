const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  profile_image: {
    type: String,
    default: 'https://github.com/shadcn.png',
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    enum: ['admin', 'manager'],
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Date,
  },
  last_login: {
    type: Date,
  },
  last_update: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
  account_type: {
    enum: ['user', 'customer', 'seller'],
    type: String,
    required: true,
  },
});

const User = model('User', UserSchema);

module.exports = User;
