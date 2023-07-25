import React from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SnackBar from "../SnackBar";
import Form from "./Form";
import axios from "axios";

const obj = [
  { label: "Name", type: "text", name: "name", multiline: false, id: "name" },
  {
    label: "Email",
    type: "email",
    name: "email",
    multiline: false,
    id: "email",
  },
  {
    label: "Phone",
    type: "number",
    name: "phone",
    multiline: false,
    id: "phone",
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
  const [values, setValues] = React.useState(["", "", "", ""]);

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
        message: "Please enter your phone number.",
      });
    } else if (values[3].length == 0) {
      setSnackbar({
        open: true,
        message: "Please enter your password.",
      });
    }

    const formData = {
      name: values[0],
      email: values[1],
      phone: values[2],
      password: values[3],
    };
    try {
      const resp = await axios.post("http://localhost:4000/register", formData);
      console.log(resp.data.message);

      if (resp.data.message == "success") {
        setSnackbar({
          open: true,
          message: "Registration successful",
        });
        setTimeout(() => {
          navigate("../cakeshop/shop");
        }, 2000);
        localStorage.setItem("token", resp.data.userData._id);
      } else if (resp.data.message == "Email already registered") {
        setSnackbar({
          open: true,
          message: "Email already registered",
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
          Register
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
              onClick={() => navigate("../cakeshop/login")}
            >
              Already a User? Login{" "}
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
