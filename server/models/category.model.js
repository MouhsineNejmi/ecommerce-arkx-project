const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const categoriesSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  category_image: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Categories = model('Categories', categoriesSchema);
module.exports = Categories;
