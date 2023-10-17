const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CustomerSchema = new Schema({
  image_name: {
    type: String,
  },
  profile_image: {
    type: String,
    default: 'https://fontawesome.com/icons/user?f=classic&s=regular&sz=lg',
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
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    enum: ['user', 'customer', 'seller'],
    type: String,
  },
  creation_date: {
    type: Date,
  },
  last_login: {
    type: Date,
  },
  valid_account: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Customer = model('Customer', CustomerSchema);

module.exports = Customer;
