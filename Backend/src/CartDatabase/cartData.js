const mongoose = require('mongoose');

const cart_schema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },cake_id:{
        type:String,
        required:true
    },quantity:{
        type:Number,
        required:true
    }
});

const cartData = mongoose.model('Cart Data',cart_schema);
module.exports = cartData;