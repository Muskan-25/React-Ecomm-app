import { Box, Button, Typography } from "@mui/material";
import React from "react";
import BgLineTop from "./BgLineTop";

const partners = [
  { logosrc: "../logo1.jpg" },
  { logosrc: "../logo2.jpg" },
  { logosrc: "../logo3.jpg" },
  { logosrc: "../logo4.jpg" },
  { logosrc: "../logo5.jpg" },
  { logosrc: "../logo6.jpg" },
];
function OurPartners() {
  return (
    <Box sx={{ background: 'url("../about2.jpg")', padding: "50px 30px" }}>
      <BgLineTop />
      <Box sx={{ marginBottom: "40px" }}>
        <Typography
          variant="h3"
          sx={{ fontSize: "32px", marginBottom: "20px", fontWeight:'600' }}
        >
          Our Partners
        </Typography>
        <Typography
          variant="p"
          sx={{ fontSize: "20px", fontFamily: "Poppins !important" }}
        >
          famous companies trusted us, why you are not
        </Typography>
      </Box>
      <Box sx={{display:'flex',flexDirection:'row',flexWrap:'wrap', gap:'30px',justifyContent:'center',padding:'20px 0'}}>
        {partners.map((partner, index)=>{
            return(
                <Box className="partnerLogo" key={index}>
                    <Button>Bakery</Button>
                    <img src={partner.logosrc} alt={partner.logosrc.substring(0,5)} />
                </Box>
            )
        })}
      </Box>
    </Box>
  );
}

export default OurPartners;
