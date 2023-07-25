const mongoose = require('mongoose');

const cake_schema = new mongoose.Schema({
    cake_name: {
        type: String,
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    img:{
        type: String,
        required: true,
    },
});

const cakeData = new mongoose.model('cakes_Data', cake_schema);
module.exports = cakeData;