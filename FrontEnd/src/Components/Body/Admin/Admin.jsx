import React from "react";
import { Box } from "@mui/material";
import Form from "../Form";
import axios from "axios";
import SnackBar from "../../SnackBar";
import { v4 } from "uuid";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import UploadProgress from "../UploadProgress";
import { useNavigate } from "react-router-dom";

const obj = [
  { label: "Cake Name", type: "text", name: "cake_name", multiline: false,id:'cake_name' },
  { label: "Cake Price", type: "number", name: "price", multiline: false, id:'price' },
  {
    label: "Cake Description",
    type: "text",
    name: "description",
    multiline: true,
    id:'description'
  },
];
function Admin() {
  const [values, setValues] = React.useState(["", "", ""]);
  const [image, setImage] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    if (values[0].length == 0) {
      setSnackbar({
        open: true,
        message: "Please enter cake name.",
      });
    } else if (values[1].length == 0) {
      setSnackbar({
        open: true,
        message: "Please enter cake price.",
      });
    } else if (values[2].length == 0) {
      setSnackbar({
        open: true,
        message: "Please enter cake description.",
      });
    } else if (image == null) {
      setSnackbar({
        open: true,
        message: "Please choose a file first.",
      });
    }

    const filename = image.name + v4();
    const imgRef = ref(storage, `cakeImages/${filename}`);
    await uploadBytes(imgRef, image);
    const downloadURL = await getDownloadURL(imgRef);

    console.log(downloadURL);
    const formData = {
      cake_name: values[0],
      price: values[1],
      description: values[2],
      img: downloadURL,
    };

    try {
      setUploading(true);
      await axios.post("http://localhost:4000/cakes", formData);
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            // If progress reaches 100%, stop the interval and set uploading state to false
            clearInterval(interval);
            setUploading(false);
            setSnackbar({
              open: true,
              message: "Data saved successfully!.",
            });
            setTimeout(() => {
              navigate("../cakeshop/admin");
            }, 2000);
          }
          return prevProgress + 10; // Increment progress by 10
        });
      }, 500);
      
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
        {uploading ? (
          <UploadProgress uploading={uploading} progress={progress} />
        ) : (
          <Form
            obj={obj}
            values={values}
            handleChange={handleChange}
            imgUpload={(e) => {
              setImage(e.target.files[0]);
            }}
            submit={handleSubmit}
          />
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

export default Admin;
