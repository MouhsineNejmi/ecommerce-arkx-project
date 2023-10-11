const mongoose = require('mongoose');
const {Schema , model} = mongoose.Schema;

const sellerSchema = new Schema({
    first_name: {
        type : String,
    },
    last_name: {
        type : String,
    },
    email:{
        type : String,
        required : true,
        unique: true,
    },
    role:{
        type : String,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    creation_date:{
        type: Date,
    },
    last_login:{
        type: Date,
    },
    last_update:{
        type: Date,
    },
    active:{
        type: Boolean,
    }
});

const Seller = model('Seller', sellerSchema); 
module.exports= Seller;

