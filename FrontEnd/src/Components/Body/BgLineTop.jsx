import React from "react";
import { Box } from "@mui/material";

function BgLineTop(props) {
    const transform = props.transform;
  return (
    <Box
      sx={{
        background: "url('../bg1.png')",
        backgroundSize: "contain",
        height: "8px",
        transform
      }}
    ></Box>
  );
}

export default BgLineTop;
