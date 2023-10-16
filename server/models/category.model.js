const mongoose = require('mongoose');
const { schema } = require('./category.model');
const { Schema, model } = mongoose;

const categoriesSchema = new Schema({
    category_name:{
        type: String,
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    }
})

const Categories = model('Categories', categoriesSchema);
module.exports = Categories;