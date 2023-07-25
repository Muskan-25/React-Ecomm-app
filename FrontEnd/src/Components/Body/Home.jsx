import React from "react";
import { Box } from "@mui/material";
import Banner from "./Banner";
import CategoryCard from "./CategoryCard";
import AboutUsSection from "./About/AboutUsSection";
import OurPartners from "./OurPartners";
import FaqContent from "./FAQ/FaqContent";

function Home() {
  return (
    <>
      
      <Box sx={{ background: 'url("../about2.jpg")' }}>
        <CategoryCard />
        <AboutUsSection
          title="About Us"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book."
        />
      </Box>
      <OurPartners />
      <FaqContent title="Frequently Asked Questions"/>
    </>
  );
}

export default Home;
