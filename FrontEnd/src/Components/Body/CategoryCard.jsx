import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    imgsrc: "category1.jpg",
    title: "Macarons",
    subtitle: "Lorem Ipsum is simply",
  },
  {
    imgsrc: "category2.jpg",
    title: "Small Cakes",
    subtitle: "Lorem Ipsum is simply",
  },
  {
    imgsrc: "category3.jpg",
    title: "Occasion Cakes",
    subtitle: "Lorem Ipsum is simply",
  },
  {
    imgsrc: "category4.jpg",
    title: "Cupcakes",
    subtitle: "Lorem Ipsum is simply",
  },
];

function CategoryCard() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        margin: { lg: "0 10% 80px", md: "0 5% 80px", xs: "0 5% 50px" },
        paddingTop: { lg: 0, md: 0, xs: "50px" },
        display: "grid",
        gridTemplateColumns: { md: "repeat(4, 1fr)", sm: "repeat(2, 1fr)" },
        gap: "30px",
      }}
      
    >
      {categories.map((item,index) => {
        return (
          <Box
          key={index}
            sx={{
              marginTop: { lg: "-80px", md: "-80px" },
              height: { lg: "500px", md: "400px", xs: "350px" },
              borderRadius: "6px",
              background: `url(${item.imgsrc})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              position: "relative",
              "&:hover": {
                transform: "rotate(-3deg) scale(1.06)",
                transition: "all ease 0.2s",
              },
              boxShadow: "0px 10px 35px 0 rgb(0 0 0 / 20%)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                color: "#fff",
                backgroundImage:
                  "linear-gradient(0deg,#001817,rgb(0 24 23 / 0%))",
                borderRadius: "6px",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontSize: "25px", fontWeight: "600" }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontSize: "16px",
                  marginBottom: "10px",
                  fontFamily: "Poppins !important",
                }}
              >
                {item.subtitle}
              </Typography>
              <Divider
                sx={{
                  background: "#5fcac7",
                  height: "3px",
                  width: "80px",
                  display: "flex",
                  margin: " 10px auto 20px",
                }}
              />
              <Button
                sx={{
                  background: "#5fcac7",
                  color: "#fff",
                  fontFamily: "Poppins !important",
                  padding: "8px 18px",
                  borderRadius: "8px",
                  marginBottom: "40px",
                }}
                onClick={()=>{navigate('../cakeshop/menu')}}
              >
                More Details{" "}
                <KeyboardDoubleArrowRightIcon
                  sx={{ fontSize: "18px", marginLeft: "5px" }}
                />
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default CategoryCard;
