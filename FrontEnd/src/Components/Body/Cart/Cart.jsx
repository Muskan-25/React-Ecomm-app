import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Cart({ setNavQuantity, setTotal }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const token = localStorage.getItem("token");
  const [cakeData, setCakeData] = React.useState([]);
  const [orders_token, setOrdersToken] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const resp = await axios.get(
            `http://localhost:4000/cart_data/${token}`
          );
          setData(resp.data.message);
          const sum = resp.data.message.reduce(
            (total, item) => total + item.quantity,
            0
          );
          setNavQuantity(sum);

          const doc = resp.data.message.map((item)=>{
            return item._id;
          })
          setOrdersToken(doc);
        } catch (e) {
          console.log(e);
        }
      } else {
        navigate("../cakeshop/login");
        setNavQuantity();
      }
    };
    fetchData();
  }, [token, data]);

  // Fetch cakeData for each item in the cart when the data changes
  React.useEffect(() => {
    const fetchCakeData = async () => {
      try {
        const requests = data.map(async (item) => {
          const response = await axios.get(
            `http://localhost:4000/cakes_data/${item.cake_id}`
          );
          return response.data;
        });
        if (requests.length > 0) {
          const cakesData = await Promise.all(requests);
          const cakes = cakesData.map((item) => {
            return item;
          });
          setCakeData(cakes);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchCakeData();
  }, [data]);

  const handleIncrement = async (id, qty) => {
    const update_quantity = await axios.put(
      `http://localhost:4000/cartupdate/${id}`,
      { quantity: qty + 1 }
    );
    const updatedData = data.map((item) => {
      if (item._id === id) {
        return { ...item, quantity: qty + 1 };
      }
      return item;
    });

    setData(updatedData);
  };

  const handleDecrement = async (id, qty) => {
    if (qty > 1) {
      const update_quantity = await axios.put(
        `http://localhost:4000/cartupdate/${id}`,
        { quantity: qty - 1 }
      );
      const updatedData = data.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: qty - 1 };
        }
        return item;
      });

      setData(updatedData);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/cart_delete/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const calculatedPrice = (pricee, qty) => {
    const price = parseInt(pricee);
    return price * qty;
  };
  let total = 0;
  const calculateTotal = (pricee, qty) => {
    total = total + (parseInt(pricee) * qty);
    setTotal(total);
    return total;
  }
  return (
    <>
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
          Cart
        </Typography>

        {data.length > 0 ? (
          <>
            {data.map((data_items, index) => {
                
              //   count = data_items.quantity;
              const quantity = data_items.quantity;
              return cakeData[index]
                ? cakeData[index].map((item) => {
                    calculateTotal(item.price, data_items.quantity);
                    return (
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "30% 70%",
                          gap: "15px",
                          padding: "10px",
                        }}
                        key={index}
                      >
                        <Box
                          sx={{
                            borderRadius: "6px",
                            padding: "10px",
                            background: `url(${item.img})no-repeat center`,
                            backgroundSize: "contain",
                          }}
                        ></Box>
                        <Box
                          sx={{
                            justifyContent: "left",
                            textAlign: "left",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Typography
                            variant="h3"
                            sx={{
                              fontFamily: "Poppins !important",
                              fontSize: "18px",
                              fontWeight: "600",
                            }}
                          >
                            {item.cake_name}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "Poppins !important",
                              fontSize: "16px",
                            }}
                          >
                            &#8377;
                            {calculatedPrice(item.price, data_items.quantity)}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "Poppins !important",
                              fontSize: "16px",
                            }}
                          >
                            <Typography
                              component="span"
                              sx={{
                                fontFamily: "Poppins !important",
                                fontWeight: "600",
                              }}
                            >
                              Size :{" "}
                            </Typography>
                            Medium
                          </Typography>
                          <Typography
                            component="article"
                            sx={{
                              fontFamily: "Poppins !important",
                              fontSize: "16px",
                            }}
                          >
                            <Typography
                              component="span"
                              sx={{
                                fontFamily: "Poppins !important",
                                fontWeight: "600",
                              }}
                            >
                              Quantity :{" "}
                            </Typography>
                            <Button
                              sx={{
                                fontSize: "20px",
                                padding: "0",
                                margin: "0",
                                fontFamily: "Poppins !important",
                                minWidth: "30px",
                              }}
                              onClick={() => {
                                handleDecrement(
                                  data_items._id,
                                  data_items.quantity
                                );
                              }}
                            >
                              -
                            </Button>{" "}
                            {quantity}{" "}
                            <Button
                              sx={{
                                fontSize: "18px",
                                padding: "0",
                                margin: "0",
                                fontFamily: "Poppins !important",
                                minWidth: "30px",
                              }}
                              onClick={() => {
                                handleIncrement(
                                  data_items._id,
                                  data_items.quantity
                                );
                              }}
                            >
                              +
                            </Button>
                          </Typography>
                          <Typography>
                            <Button
                              sx={{
                                fontFamily: "Poppins !important",
                                padding: "0",
                              }}
                              onClick={() => {
                                handleRemove(data_items._id);
                              }}
                            >
                              Remove
                            </Button>
                          </Typography>
                        </Box>
                        <Divider />
                      </Box>
                    );
                  })
                : "";
            })}
            <Button
              sx={{
                background: "#5fcac7",
                fontFamily: "Poppins !important",
                color: "#fff",
                "&:hover": { fontWeight: "800", color: "#5fcac7" },
                margin: "5px 0",
                fontSize: { sm: "16px", xs: "12px" },
              }}
              onClick={() => {
                navigate(`../cakeshop/checkout`);
              }}
            >
              Proceed to checkout
            </Button>
          </>
        ) : (
          <>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Poppins !important",
                fontSize: "16px",
                marginBottom: "20px",
              }}
            >
              Your cart is currently empty. Please add items to continue.
            </Typography>
            <Button
              sx={{
                background: "#5fcac7",
                fontFamily: "Poppins !important",
                color: "#fff",
                "&:hover": { fontWeight: "800", color: "#5fcac7" },
                margin: "5px 0",
                fontSize: { sm: "16px", xs: "12px" },
              }}
              onClick={() => {
                navigate("../cakeshop/shop");
              }}
            >
              Order Now
            </Button>
          </>
        )}
      </Box>
    </>
  );
}

export default Cart;
