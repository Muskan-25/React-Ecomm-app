import React from "react";
import Banner from "../Banner";
import { Box } from "@mui/material";
import AboutUsSection from "./AboutUsSection";
import OurPartners from "../OurPartners";

function About() {
  return (
    <>
      <Box
        sx={{
          background: "url('../about2.jpg') center",
          backgroundSize: "cover",
          padding: "50px 0",
        }}
      >
        <AboutUsSection
          title="About Us"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book."
        />
      </Box>
      <Box>
        <OurPartners />
      </Box>
    </>
  );
}

export default About;
