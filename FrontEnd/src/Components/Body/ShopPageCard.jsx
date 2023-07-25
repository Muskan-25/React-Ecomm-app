import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ShopPageCard(props) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          md: "column",
          lg: "column",
          sm: "column",
          xs: "row",
        },
        justifyContent: "space-between",
        border: "1px solid #00000020",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          background: `url(${props.img}) no-repeat center`,
          backgroundSize: "cover",
          height: { sm: "25vh", xs: "auto" },
          width: { xs: "42%", sm: "100%" },
        }}
      ></Box>
      <Box sx={{ borderLeft: { xs: "1px solid #00000020", sm: "0" } }}></Box>
      <Box sx={{ width: { sm: "100%", xs: "55%" }, textAlign: "left" }}>
        <Button
          sx={{
            background: "transparent !important",
            fontFamily: "Poppins !important",
            padding: "0px",
            color: "#5fcac7",
            "&:hover": { fontWeight: "800" },
          }}
          onClick={() => {
            navigate(`../cakeshop/product-detail?id=${props.id}`);
          }}
        >
          Order Now
        </Button>
        <Typography>{props.cake_name}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            placeItems: "center",
          }}
        >
          <Typography>&#8377;{props.price}</Typography>
          <Button
            sx={{
              background: "#5fcac7",
              fontFamily: "Poppins !important",
              color: "#fff",
              "&:hover": { fontWeight: "800", color: "#5fcac7" },
              margin: "5px 0",
              fontSize: { sm: "16px", xs: "12px" },
            }}
            // onClick={() => {
            //   navigate(`../cakeshop/cart?id=${props.id}`);
            // }}
            onClick={props.handleClick}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ShopPageCard;
