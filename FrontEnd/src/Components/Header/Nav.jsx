import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

//drawer elements used
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { handleLogout } from "../../App";
import SnackBar from "../SnackBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Typography } from "@mui/material";
import axios from "axios";

export const navigationItems = [
  { name: "Home", link: "/cakeshop" },
  { name: "About", link: "/cakeshop/about" },
  { name: "Our Menu", link: "/cakeshop/menu" },
  { name: "Shop", link: "/cakeshop/shop" },
  { name: "FAQ's", link: "/cakeshop/faqs" },
  { name: "Cart", link: "/cakeshop/cart" },
];

export default function Nav({navQuantity}) {
  //search as JSX
  const email = localStorage.getItem("token");
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

  const pages =
    email != null
      ? [{ name: "Logout" }]
      : [{ name: "Login" }, { name: "Register" }];
  let navigate = useNavigate();
  const handleOpenNavMenu = (e) => {
    e.preventDefault();
    if (e.currentTarget.textContent == "Login") {
      navigate("../cakeshop/login");
    }
    if (e.currentTarget.textContent == "Register") {
      navigate("../cakeshop/register");
    }
    if (e.currentTarget.textContent == "Logout") {
      handleLogout();
      setSnackbar({
        open: true,
        message: "Logged out successfully.",
      });
      setTimeout(() => {
        navigate("../cakeshop");
      }, 2000);
    }
  };

  /*
  react useState hook to save the current open/close state of the drawer,
  normally variables dissapear afte the function was executed
  */
  const [open, setState] = useState(false);

  /*
  function that is being called every time the drawer should open or close,
  the keys tab and shift are excluded so the user can focus between
  the elements with the keys
  */
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    //changes the function state according to the value of open
    setState(open);
  };

  const handleCloseNavMenu = (e) => {
    e.preventDefault();
    if (e.currentTarget.textContent == "Login") {
      navigate("../cakeshop/login");
      setState(false);
    }
    if (e.currentTarget.textContent == "Register") {
      navigate("../cakeshop/register");
      setState(false);
    }
    if (e.currentTarget.textContent == "Logout") {
      handleLogout();
      setState(false);
      setSnackbar({
        open: true,
        message: "Logged out successfully.",
      });
      setTimeout(() => {
        navigate("../cakeshop");
      }, 2000);
    }
  };

  const totalMenuItems = navigationItems.length / 2;

  return (
    <AppBar
      position="relative"
      sx={{ backgroundColor: "transparent", mt: 0, zIndex: 1, boxShadow: 0 }}
    >
      <Container maxWidth="md" disableGutters={true}>
        <Toolbar sx={{ justifyContent: { lg: "center", xs: "end" } }}>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              justifyContent: "center",
              height: "50px",
            }}
          >
            <img
              src="../logo.png"
              style={{
                width: "125px",
                height: "fit-content",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("../");
              }}
            />
          </Box>
          <Box sx={{ display: {md:"none",xs:'flex'}, position: "relative" }}>
              <ShoppingCartIcon sx={{ color: "#000",cursor :'pointer' }} onClick={()=>{navigate('../cakeshop/cart')}}/>
              <Typography
                component="span"
                sx={{ position: "absolute", top: '-9px', right: "-9px", color: "#000" }}
              >
                {navQuantity}
              </Typography>
            </Box>
          <IconButton
            edge="end"
            color="#07294d"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
              color: "#2B2D2E",
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* The outside of the drawer */}
          <Drawer
            //from which side the drawer slides in
            anchor="left"
            //if open is true --> drawer is shown
            open={open}
            //function that is called when the drawer should close
            onClose={toggleDrawer(false)}
            //function that is called when the drawer should open

            sx={{}}
          >
            {/* The inside of the drawer */}
            <Box
              sx={{
                px: 3,
                height: 1,
                width: "300px",
                backgroundColor: "#fff",
                marginTop: "60px",
              }}
            >
              {/* 
                  when clicking the icon it calls the function toggleDrawer 
                  and closes the drawer by setting the variable open to false
                  */}
              <IconButton sx={{ mb: 2 }} onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ flexGrow: 1, display: { xs: "block", md: "none" } }}>
                {navigationItems.map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => {
                      navigate(page.link);
                      setState(false);
                    }}
                    className="btns"
                    sx={{
                      color: "#2B2D2E",
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 800,
                      textAlign: "justify",
                      transition: "all 0.4s linear",
                      "&:hover": { color: "#5FCAC7" },
                    }}
                  >
                    {page.name}
                  </Button>
                ))}
                <Box
                  sx={{
                    position: "absolute",
                    placeItems: "center",
                    top: "auto",
                    bottom: "0",
                    display: "flex",
                  }}
                >
                  {pages.map((page, index) => {
                    return (
                      <Button
                        key={index}
                        className="btns"
                        sx={{
                          color: "#2B2D2E",
                          backgroundColor: "#fff",
                          display: "block",
                          textTransform: "capitalize",
                          fontSize: "18px",
                          fontWeight: 800,
                          transition: "all 0.4s linear",
                          transition: "all 0.4s linear",
                          padding: "0px",
                          mx: "0px",
                          height: "70px",
                          "&:hover": { color: "#5FCAC7" },
                        }}
                        onClick={(e) => {
                          handleCloseNavMenu(e);
                        }}
                      >
                        {page.name}
                      </Button>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Drawer>
          
          <Box
            sx={{
              flexGrow: 1,
              gap: {lg:"20px",md:'10px'},
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              height: "90px",
              placeItems:'center'
            }}
          >
            {navigationItems.map((page, index) => (
              <React.Fragment key={page.name}>
                <Button
                  className="btns"
                  sx={{
                    color: "#2B2D2E",
                    backgroundColor: "#fff",
                    display: "block",
                    textTransform: "capitalize",
                    fontSize: "18px",
                    fontWeight: 800,
                    transition: "all 0.4s linear",
                    transition: "all 0.4s linear",
                    padding: "8px 0px",
                    mx: "10px",
                    height: "70px",
                    "&:hover": { color: "#5FCAC7" },
                  }}
                  onClick={() => {
                    navigate(page.link);
                  }}
                >
                  {page.name}
                </Button>
                <>
                  {index == totalMenuItems - 1 && (
                    <img
                      src="../logo.png"
                      style={{
                        width: "170px",
                        height: "fit-content",
                        cursor: "pointer",
                        marginTop:'70px'
                      }}
                      onClick={() => {
                        navigate("../");
                      }}
                    />
                  )}
                </>
              </React.Fragment>
            ))}
          </Box>
        </Toolbar>
        <Box
          sx={{
            position: "absolute",
            right: "50px",
            display: { md: "flex", xs: "none" },
            placeItems: "center",
            top: "0",
            bottom: "0",
            gap:'10px'
          }}
        >
          <>
            <Box sx={{ display: "flex", position: "relative" }}>
              <ShoppingCartIcon sx={{ color: "#000",cursor :'pointer' }} onClick={()=>{navigate('../cakeshop/cart')}} />
              <Typography
                component="span"
                sx={{ position: "absolute", top: '-9px', right: "-9px", color: "#000" }}
              >
                {navQuantity}
              </Typography>
            </Box>
            {pages.map((page, index) => {
              return (
                <Button
                  key={index}
                  className="btns"
                  sx={{
                    color: "#2B2D2E",
                    backgroundColor: "#fff",
                    display: "block",
                    textTransform: "capitalize",
                    fontSize: "18px",
                    fontWeight: 800,
                    transition: "all 0.4s linear",
                    transition: "all 0.4s linear",
                    padding: "8px 0px",
                    mx: "10px",
                    height: "70px",
                    "&:hover": { color: "#5FCAC7" },
                  }}
                  onClick={(e) => {
                    handleOpenNavMenu(e);
                  }}
                >
                  {page.name}
                </Button>
              );
            })}
          </>
        </Box>
      </Container>
      <SnackBar
        open={snackbar.open}
        message={snackbar.message}
        handleSnackbarClose={handleSnackbarClose}
      />
    </AppBar>
  );
}
