import React from "react";
import { Box } from "@mui/material";
import FaqContent from "./FaqContent";

function Faq() {
  return (
    <>
      <Box
        sx={{
          background: "url('../about2.jpg') center",
          backgroundSize: "cover",
          padding: "50px 0",
        }}
      >
        <FaqContent title="Do You Have Any Questions?" text="Please read questions bellow and if you can not find your answer, please
        send us your question, we will answer you as soon as possible."/>
      </Box>
    </>
  );
}

export default Faq;
