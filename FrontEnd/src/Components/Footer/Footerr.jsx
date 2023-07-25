import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import BgLineTop from "../Body/BgLineTop";
import { navigationItems } from "../Header/Nav";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useNavigate } from "react-router-dom";

const contactus = [
  { icon: <LocationOnIcon />, text: "Amritsar City, Punjab" },
  { icon: <CallIcon />, text: "98765-43210" },
  { icon: <EmailIcon />, text: "Info@cakeshop.com" },
];

function Footerr() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          background: "url('../banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box sx={{ background: "#00000045" }}>
          <BgLineTop />
          <Box
            sx={{
              padding: "60px 0px",
              display: "grid",
              gridTemplateColumns: {md:"repeat(3, 1fr)"},
              color: "#fff",
              justifyContent: "left",
              textAlign: "left",
              gap: "20px",
              margin: "0 10%",
            }}
          >
            <Box sx={{ color: "#fff", padding: {md:"0 15px"} }}>
              <Typography
                variant="h3"
                sx={{ marginBottom: "20px", fontSize: "20px" }}
              >
                Contact Us
              </Typography>
              <Divider sx={{ background: "#ffffff55", marginBottom: "20px" }} />

              {contactus.map((contacts,index) => {
                return (
                  <Button
                  key={index}
                    sx={{
                      background: "transparent !important",
                      cursor: "default",
                      marginBottom: "5px",
                      fontSize: "16px",
                      color: "#fff",
                      fontFamily: "Poppins !important",
                      textTransform: "capitalize",
                    }}
                  >
                    <Typography
                      variant="span"
                      sx={{
                        background: "#fff",
                        color: "#5fcac7",
                        borderRadius: "50%",
                        marginRight: "10px",
                        fontSize: "10px",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        placeItems: "center",
                        justifyContent: "center",
                        "&:hover": {
                          backgroundColor: "#5fcac7",
                          color: "#fff",
                          transition: "all ease 1s",
                        },
                      }}
                    >
                      {contacts.icon}
                    </Typography>

                    {contacts.text}
                  </Button>
                );
              })}
            </Box>
            
            <Box sx={{ color: "#fff", padding: {md:"0 15px"} }}>
              <Typography
                variant="h3"
                sx={{ marginBottom: "20px", fontSize: "20px" }}
              >
                Quick Links
              </Typography>
              <Divider sx={{ background: "#ffffff55", marginBottom: "20px" }} />
              <ul
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                  padding:'0',
                  margin:'0'
                }}
              >
                {navigationItems.map((nav) => {
                  return (
                    <li
                      key={nav.name}
                      style={{
                        background: "transparent !important",
                        cursor: "pointer",
                        fontSize: "16px",
                        color: "#fff",
                        textTransform: "capitalize",
                        listStyle: "none",
                        marginBottom:'5px'
                      }}
                      onClick={() => {
                        navigate(`../${nav.link}`);
                      }}
                    >
                      <KeyboardDoubleArrowRightIcon
                        sx={{
                          marginRight: "10px",
                          fontSize: "16px",
                          placeItems: "center",
                          justifyContent: "center",
                        }}
                      />
                      <Typography variant="span"
                        sx={{
                          fontFamily: "Poppins !important",
                        }}
                      >
                        {nav.name}
                      </Typography>
                    </li>
                  );
                })}
              </ul>
            </Box>
            <Box sx={{ color: "#fff", padding: {md:"0 15px"} }}>
              <Typography
                variant="h3"
                sx={{ marginBottom: "20px", fontSize: "20px" }}
              >
                Opening Hours
              </Typography>
              <Divider sx={{ background: "#ffffff55", marginBottom: "20px" }} />
              <Typography sx={{fontFamily:'Poppins !important', fontSize:'16px',}}>
                We are 24*7 available.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          background: "#5fcac7",
          padding: "10px 30px",
          color: "#fff",
          fontFamily: "Roboto !important",
        }}
      >
        Copyright &copy; <span>{new Date().getFullYear()}</span> Muskan. all
        rights reserved.
      </Box>
    </>
  );
}

export default Footerr;
