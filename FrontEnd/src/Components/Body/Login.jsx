import React from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SnackBar from "../SnackBar";
import Form from "./Form";
import axios from "axios";

const obj = [
  {
    label: "Email",
    type: "email",
    name: "email",
    multiline: false,
    id: "email",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    multiline: false,
    id: "password",
  },
];
function Login() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [values, setValues] = React.useState(["", ""]);

  const handleChange = (e, index) => {
    const newValues = [...values];
    newValues[index] = e.target.value;
    setValues(newValues);
  };

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

  const handleSubmit = async () => {
    const formData = {
      email: values[0],
      password: values[1],
    };

    try {
      const resp = await axios.post("https://cakeshop-api-o8x3.onrender.com/login", formData);
      console.log(resp.data.message);
      if (values[0].length == 0) {
        setSnackbar({
          open: true,
          message: "Please enter your email.",
        });
      } else if (values[1].length == 0) {
        setSnackbar({
          open: true,
          message: "Please enter your password.",
        });
      } else if (values[0] == "admin" && values[1] == "admin123") {
        setSnackbar({
          open: true,
          message: "Login Successful.",
        });
        setTimeout(() => {
          navigate("../cakeshop/admin");
        }, 2000);
      } else if (resp.data.message == "login successful") {
        setSnackbar({
          open: true,
          message: "Login Successful.",
        });
        setTimeout(() => {
          navigate("../cakeshop/shop");
        }, 2000);
        localStorage.setItem("token", resp.data.userData._id);
      } else if (resp.data.message == "Password incorrect") {
        setSnackbar({
          open: true,
          message: "Incorrect password please try again!",
        });
      } else if (resp.data.message == "Login failed") {
        setSnackbar({
          open: true,
          message: "Login failed! please try again!",
        });
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
        <Typography
          sx={{
            fontFamily: "Poppins !important",
            fontSize: "25px",
            color: "#5fcac7",
            fontWeight: "900",
          }}
        >
          Login
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Form
              obj={obj}
              values={values}
              handleChange={handleChange}
              submit={handleSubmit}
            />
            <Button
              sx={{
                fontFamily: "Poppins !important",
                color: "#000",
                marginTop: "10px",
                textTransform: "capitalize",
              }}
              onClick={() => navigate("../cakeshop/register")}
            >
              New User? Register{" "}
            </Button>
          </>
        )}
        <SnackBar
          open={snackbar.open}
          message={snackbar.message}
          handleSnackbarClose={handleSnackbarClose}
        />
      </Box>
    </>
  );
}

export default Login;
