import { Box, Typography } from "@mui/material";
import React from "react";
import BasicAccordion from "../Accordion";

function FaqContent(props) {
  return (
    <Box
      sx={{
        margin: "0 auto 40px",
        background: "transparent",
        paddding: "0 25px",
        width: { md: "1020px", xs: "280px" },
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontSize: "32px", marginBottom: "20px", fontWeight: "600" }}
      >
        {props.title}
      </Typography>
      <Typography
        variant="p"
        sx={{
          fontSize: "20px",
          fontFamily: "Poppins !important",
          marginBottom: "40px",
        }}
      >
        {props.text}
      </Typography>
      <BasicAccordion />
      
    </Box>
  );
}

export default FaqContent;
