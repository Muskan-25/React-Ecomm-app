import * as React from "react";
import {
  OutlinedInput,
  InputAdornment,
  FormControl,
  Button,
  Box,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useLocation } from "react-router-dom";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            // Styles for the focused state here
            border: "2px solid #5fcac7",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#5fcac7",
            fontWeight: "800",
            fontSize: "16px",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&:after": {
            borderBottom: "2px solid #5fcac7",
          },
        },
      },
    },
  },
});

export default function Form({ obj, values, handleChange,imgUpload,submit}) {
  const location = useLocation();
  const permalink = location.pathname.substring(1);
  const [state, setState] = React.useState(false);
  React.useEffect(() => {
    if (permalink == "cakeshop/admin") {
      setState(true);
    }
  }, [permalink]);
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: { md: "40vw", xs: "80vw" } },
          display:'flex',
          flexDirection:'column',
          placeItems:'center',
          gap:'5px'
        }}
        noValidate
        autoComplete="off"
      >
        {obj.map((item, index) => {
          return (
            <TextField
              key={index}
              id={`${item.id}, "standard-basic"`}
              label={item.label}
              variant="standard"
              type={item.type}
              name={item.name}
              value={values[index]}
              multiline={item.multiline}
              onChange={(e)=>handleChange(e, index)}
              sx={{fontFamily:'Poppins !important'}}
            />
          );
        })}

        {state ? (
          <FormControl fullWidth sx={{ m: 1 }}>
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                  <AttachFileIcon />
                </InputAdornment>
              }
              type="file"
              text="Upload "
              inputProps={{ accept: "image/*" }}
              name="img"
              onChange={imgUpload}
            />
          </FormControl>
        ) : (
          ""
        )}
        <Button
          sx={{
            fontWeight: "400",
            fontFamily: "Poppins !important",
            fontSize: "18px",
            margin: "0 auto !important",
            color:'#fff',
            background:'#5fcac7',
            width:'120px !important',
            textTransform:'capitalize',
            '&:hover':{color:'#00000070'}
          }}
          onClick={submit}
        >
          Submit
        </Button>
      </Box>
    </ThemeProvider>
  );
}
