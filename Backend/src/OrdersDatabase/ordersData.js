const mongoose = require("mongoose");

const orders_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  orders: [
    {
      cake_name: {
        type: String,
        required: true,
      },quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  amount_payable:{
    type: Number,
    required: true,
  }
});

const ordersData = mongoose.model("orders data", orders_schema);
module.exports = ordersData;
