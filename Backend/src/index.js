const express = require("express");
const port = 4000;
const app = express();
var cors = require("cors");
require("./mongooseConnection");
const bodyparser = require("body-parser");
const cakeDetails = require("./CakeDatabase/cakeData");
const userData = require("./UserDatabase/userData");
const cartData = require("./CartDatabase/cartData");
const ordersData = require("./OrdersDatabase/ordersData");

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use(express.json());

app.get("/cakes_data", async (req, res) => {
  let cakeData = await cakeDetails.find({});
  // console.log(cakeData);
  res.send(cakeData);
});

app.get("/cakes_data/:id", async (req, res) => {
  let cakeData = await cakeDetails.find({ _id: req.params.id });
  // console.log(cakeData);
  res.send(cakeData);
});

app.post("/register", async (req, res) => {
  try {
    let user_details = new userData(req.body);
    let req_userData = await userData.findOne({ email: req.body.email });
    if (req_userData !== null) {
      res.send({ message: "Email already registered" });
      //    console.log('Email already registered');
    } else {
      const req_userDetails = await user_details.save();
      return res
        .status(200)
        .send({ message: "success", userData: req_userDetails });
    }
  } catch (e) {
    res.send({ error: e, message: "invalid" });
  }
});

app.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  const req_userData = await userData.findOne({ email: email });
  if (req_userData !== null) {
    if (req_userData.password === password) {
      res.send({ message: "login successful", userData: req_userData });
    } else {
      res.send({ message: "Password incorrect" });
    }
  } else {
    res.send({ message: "Login failed" });
  }
  // console.log(email, typeof(password))
  // console.log(req_userData)
});

app.post("/cakes", async (req, res) => {
  let cakes_details = new cakeDetails(req.body);
  try {
    await cakes_details.save();
    res.status(200).send({ message: "success" });
  } catch (e) {
    res.send({
      error: e,
      message: "invalid",
    });
    console.log(e);
  }
});

app.get("/cart_data/:id", async (req, res) => {
  let email = req.params.id;
  let cartDetails = await cartData.find({user_id:email});
  res.send({ message: cartDetails });
});

app.post("/cart", async (req, res) => {
  let cartDetails = new cartData(req.body);
  try {
    let existing_item = await cartData.findOne({
      user_id: req.body.user_id,
      cake_id: req.body.cake_id,
    });
    if (existing_item !== null) {
      if (existing_item.cake_id === req.body.cake_id) {
        res.send({ message: "item already exists.",existing_item });
      } else if (existing_item.cake_id !== req.body.cake_id) {
        let req_cartData = await cartDetails.save();
        res.send({ message: "success", req_cartData });
      }
    } else {
      let req_cartData = await cartDetails.save();
      res.send({ message: "success", req_cartData });
    }
  } catch (e) {
    console.log(e);
  }
});

app.put('/cartupdate/:id', async (req, res) => {
    const id = req.params.id;
    const quantity = req.body.quantity;
    try{
        const req_cart_update = await cartData.findOneAndUpdate({_id:id},{ $set: { quantity: quantity } },{ upsert: true, new: true })
        console.log(req_cart_update);
        res.send({message:'success',req_cart_update})
    }catch(e){
        console.log(e);
    }
});

app.delete('/cart_delete/:id', async (req,res)=>{
    const id = req.params.id;
    try{
        const req_cart_delete = await cartData.findOneAndDelete({_id:id});
        res.send({message:'success',req_cart_delete});
    }catch(e){
        console.log(e);
        res.send({message:'error'});
    }
});

app.get('/orders_data', async (req, res) => {
    try{
        let orders = await ordersData.find({});
        res.send({message:'success',orders});
    }catch(e){
        console.log(e);
    }
});

app.post('/orders_post', async(req, res) =>{
    let orders = new ordersData(req.body);
    try{
        let req_orders_data =  await orders.save();
        res.send({message:'success', req_orders_data});
    }catch(e){
        console.log(e);
    }
})

app.listen(port, () => {
  console.log(`listening on port 4000 : http://localhost:4000`);
});
