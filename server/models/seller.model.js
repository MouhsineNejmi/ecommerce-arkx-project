const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const SellerSchema = new Schema({
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
});

const Seller = model('Seller', SellerSchema);

module.exports = Seller;
