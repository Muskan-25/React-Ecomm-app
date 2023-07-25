import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShopPageCard from "../ShopPageCard";
import CircularProgress from "@mui/material/CircularProgress";
import SnackBar from "../../SnackBar";

function Shop() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://cakeshop-api-o8x3.onrender.com/cakes_data");
        setLoading(false);
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const handleClick = async (cake_id) => {
    try {
      let user_id = localStorage.getItem("token");
      if (user_id) {
        const cartDetails = {
          user_id,
          cake_id,
          quantity: 1,
        };
        const req_cartDetails = await axios.post("https://cakeshop-api-o8x3.onrender.com/cart/", cartDetails);
        if(req_cartDetails.data.message === "success"){
          setSnackbar({
            open: true,
            message: "Item added to cart successfully.",
          });
          setTimeout(()=>{navigate('../cakeshop/cart')},2000);
        }else if(req_cartDetails.data.message === "item already exists."){
          const existing_item_id = req_cartDetails.data.existing_item._id;
          const qty = req_cartDetails.data.existing_item.quantity+1;
          const updateCart = await axios.put(`https://cakeshop-api-o8x3.onrender.com/cartupdate/${existing_item_id}`,{quantity:qty});
          if(updateCart.data.message === "success"){
            setSnackbar({
              open: true,
              message: "Item updated.",
            });
          setTimeout(()=>{navigate('../cakeshop/cart')},2000);

          }
        }
      } else {
        setSnackbar({
          open: true,
          message: "Item failed to be added. Please Login and try again.",
        });
        setTimeout(() => {
          navigate("../cakeshop/login");
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Box
        sx={{
          background: "url('../about2.jpg')",
          padding: { sm: "50px 10%", xs: "50px 15px" },
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                lg: "repeat(4,1fr)",
                md: "repeat(3,1fr)",
                sm: "repeat(2,1fr)",
                xs: "1fr",
              },
              justifyContent: "center",
              gap: { md: "30px", xs: "15px" },
            }}
          >
            {data.map((item, index) => {
              return (
                <ShopPageCard
                  key={index}
                  img={item.img}
                  id={item._id}
                  cake_name={item.cake_name}
                  price={item.price}
                  handleClick={()=>{handleClick(item._id)}}
                />
              );
            })}
            <SnackBar
              open={snackbar.open}
              message={snackbar.message}
              handleSnackbarClose={handleSnackbarClose}
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export default Shop;
