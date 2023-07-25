import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "../Form";
import SnackBar from "../../SnackBar";
import axios from "axios";
import Swal from 'sweetalert2'

const obj = [
  { label: "Name", type: "text", name: "name", multiline: false, id:'name' },
  { label: "Email", type: "email", name: "email", multiline: false, id:'email' },
  { label: "phone", type: "number", name: "phone", multiline: false, id:'phone' },
  { label: "Address", type: "text", name: "address", multiline: true, id:'address' },
];
function Checkout({ total, setNavQuantity}) {
  const [values, setValues] = React.useState(["", "", "", ""]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = JSON.parse(
    new URLSearchParams(location.search).get("orders_token")
  );
  const token = localStorage.getItem("token");
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
  });

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const handleChange = (e, index) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    setValues(newValues);
  };

  const handleSubmit = async (e) => {
    try {
      if (token) {
        if (values[0].length == 0) {
          setSnackbar({
            open: true,
            message: "Please enter your name.",
          });
        } else if (values[1].length == 0) {
          setSnackbar({
            open: true,
            message: "Please enter your email.",
          });
        } else if (values[2].length == 0) {
          setSnackbar({
            open: true,
            message: "Please enter your phone.",
          });
        } else if (values[3].length == 0) {
          setSnackbar({
            open: true,
            message: "Please enter your address.",
          });
        }

        const cartId = (
          await axios.get(`https://cakeshop-api-o8x3.onrender.com/cart_data/${token}`)
        ).data.message.map((item) => {
          return item;
        });
        let cakesData = [];
        let quantity = [];
        for (let i = 0; i < cartId.length; i++) {
          const cakename = (
            await axios.get(
              `https://cakeshop-api-o8x3.onrender.com/cakes_data/${cartId[i].cake_id}`
            )
          ).data.map((item) => {
            return item.cake_name;
          });
          cakesData.push(...cakename);
          quantity.push(cartId[i].quantity);
        }

        const formData = {
          name: values[0],
          email: values[1],
          phone: values[2],
          address: values[3],
          orders: cakesData.map((cakeName, i) => ({
            cake_name: cakeName,
            quantity: quantity[i],
          })),
          amount_payable: total,
        };

        const resp = await axios.post(
          `https://cakeshop-api-o8x3.onrender.com/orders_post`,
          formData
        );
        if(resp.data.message === 'success'){
            const cart_id_array= cartId.map((cart)=>{return cart._id});
            const cart_id = cart_id_array.map(async(item)=>{
                const resp = await axios.delete(`https://cakeshop-api-o8x3.onrender.com/cart_delete/${item}`);
                if(resp.data.message === 'success'){
                    Swal.fire({
                        icon: 'success',
                        title: 'Order Placed Successfully!',
                        text:'Thank you for your order. Your items will be delivered soon.',
                        showConfirmButton: false,
                        timer:1000,
                      })
                      setNavQuantity(0);
                      setTimeout(function() {navigate("../cakeshop/shop")},1000)
                }
            });
        }
      } else {
        navigate("../cakeshop/login");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box
      sx={{
        background: "url('../about2.jpg')",
        padding: { sm: "50px 25%", xs: "50px 15px" },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Poppins !important",
          fontSize: "25px",
          marginBottom: "20px",
        }}
      >
        Checkout
      </Typography>

      <Typography
        variant="h3"
        sx={{
          fontFamily: "Poppins !important",
          fontSize: "20px",
          marginBottom: "20px",
        }}
      >
        Billing Details
      </Typography>
      <Form
        obj={obj}
        values={values}
        handleChange={handleChange}
        submit={handleSubmit}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { md: "repeat(2,1fr)", xs: "1fr" },
          justifyContent: "center",
          padding: { md: "20px 0", xs: "20px 0" },
          gap: "30px",
        }}
      >
        <Box sx={{background:'#f6f6f6', padding:"30px 15px"}}>
            <Typography variant="h2"
        sx={{
          fontFamily: "Poppins !important",
          fontSize: "25px",
          marginBottom: "20px",
        }}> Cart Total</Typography>
        <Typography>
            Total : &#8377;{total === 0 ? navigate('../cakeshop/cart'):total}
        </Typography>
        </Box>
        <Box sx={{background:'#f6f6f6', padding:"30px 15px"}}>
            <Typography variant="h2"
        sx={{
          fontFamily: "Poppins !important",
          fontSize: "25px",
          marginBottom: "20px",
        }}> Payment Method</Typography>
        <Typography>
        Cash on Delivery
        </Typography>
        </Box>
      </Box>
      <SnackBar
        open={snackbar.open}
        message={snackbar.message}
        handleSnackbarClose={handleSnackbarClose}
      />
    </Box>
  );
}

export default Checkout;
