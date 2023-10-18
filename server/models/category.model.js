const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const categoriesSchema = new Schema({
    category_name:{
        type: String,
        unique: true
    },
    active: {
        type: Boolean,
        default: false
    }
})

const Categories = model('Categories', categoriesSchema);
module.exports = Categories;