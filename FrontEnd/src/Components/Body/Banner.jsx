import React from "react";
import { Box, Button, Typography } from "@mui/material";
import BgLineTop from "./BgLineTop";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

function Banner(props) {
  const id = useLocation();
  const permalink = id.pathname.substring(1);
  const [state, setState] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (permalink == "cakeshop") {
      setState(false);
    }else{
      setState(true);
    }
  }, [id, permalink]);

  return (
    <Box
      sx={{
        backgroundImage: state ? "url('../banner2.jpg')" : "url('../banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <BgLineTop />
      <Box
        sx={{
          padding:
            permalink === "cakeshop"
              ? { md: "220px 0", xs: "80px 0" }
              : { md: "100px 0", xs: "80px 0" },
          color: "#fff",
        }}
      >
        <Typography
          variant="p"
          sx={{
            fontSize: { md: "28px", xs: "16px" },
            textTransform: "capitalize",
          }}
        >
          {state? "":"Cakes & Bakery"}
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize:
              permalink === "cakeshop"
                ? { md: "80px", xs: "32px" }
                : { md: "40px", xs: "32px" },
            textTransform: "capitalize",
          }}
        >
          {state? id.pathname.substring(10,24):"Welcome to Bakery"}
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontSize: { md: "28px", xs: "16px" },
            fontFamily: "Roboto !important",
            textTransform: "capitalize",
          }}
        >
          {state? "":"The Best Cakes In Amritsar"}
        </Typography>
        {state ? (
          <Button
            sx={{
              background: "#ffffff4d",
              color: "#fff",
              fontSize: "14px",
              fontFamily: "sans-serif !important",
              marginTop: "20px",
              cursor: "default",
              "&:hover": { background: "#ffffff4d" },
              padding: "8px 20px",
            }}
          >
            <HomeIcon
              sx={{ paddingRight: "10px", fontSize: "14px", cursor: "pointer" }}
              onClick={() => {
                navigate("../");
              }}
            />{" "}
            <KeyboardDoubleArrowRightIcon
              sx={{ paddingRight: "10px", fontSize: "14px" }}
            />{" "}
            {id.pathname.substring(10,24)}
          </Button>
        ) : (
          <Button
            sx={{
              background: "#5fcac7",
              color: "#fff",
              fontSize: "14px",
              fontFamily: "sans-serif !important",
              marginTop: "20px",
              "&:hover": { background: "#ffffff", color: "#000000" },
              padding: "10px 25px",
            }}
            onClick={() => {
              navigate("../cakeshop/about");
            }}
          >
            About Us
          </Button>
        )}
      </Box>
      {state && <BgLineTop transform="rotateX(180deg)" />}
    </Box>
  );
}

export default Banner;
