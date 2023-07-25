import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const faqs = [
  {
    q: "What types of cakes do you offer?",
    a: "We offer a wide variety of cakes, including chocolate, vanilla, red velvet, fruitcake, and many more. We also have specialty cakes like cheesecakes, mousse cakes, and tiered wedding cakes.",
  },
  {
    q: "Do you offer customization for cakes?",
    a: "Yes, we offer customization options for cakes. You can choose the flavor, frosting, decorations, and even add personalized messages or designs.",
  },
  {
    q: "Are your cakes suitable for people with dietary restrictions?",
    a: "We offer a selection of cakes that cater to specific dietary needs, such as gluten-free, dairy-free, and vegan options. Please let us know about any dietary restrictions, and we will assist you accordingly.",
  },
  {
    q: "How far in advance should I place my cake order?",
    a: "It's best to place your order at least 48 hours in advance to ensure availability. However, for large or specialized cakes, such as wedding cakes, we recommend placing your order several weeks in advance.",
  },
  {
    q: "Can I order a cake online?",
    a: "Yes, we have an online ordering system on our website. You can browse our cake options, select your preferences, and place an order conveniently.",
  },
  {
    q: "Do you offer delivery services?",
    a: "Yes, we offer delivery services within a certain radius from our shop. Delivery fees may apply based on the distance. Please inquire about delivery options when placing your order.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Our cancellation policy may vary, but generally, we require a notice of at least 24 to 48 hours for cancellations. However, for large or specialized orders, such as wedding cakes, we may require a more extended notice period.",
  },
];

export default function BasicAccordion() {
    const navigate = useNavigate();
    const id = useLocation();
    const permalink = id.pathname.substring(1);

    const [state, setState]= React.useState(false);

    React.useEffect(()=>{
        if(permalink == "cakeshop"){
            setState(true);
        }
    },[permalink]);

    const displayedFaqs = state ? faqs.slice(0,3) : faqs;
  return (
    <Box sx={{ margin: "30px 0" }}>
      {displayedFaqs.map((faq,index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary
              
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                "&:hover": { color: "#5fcac7", fontWeight: "800 !important" },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins !important",
                  "&:hover": { color: "#5fcac7", fontWeight: "800" },
                }}
              >
                {faq.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{ fontFamily: "Poppins !important", textAlign: "left" }}
              >
                {faq.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
      {state ? (
        <Button
        sx={{
          background: "#5fcac7",
          color: "#fff",
          fontSize: "14px",
          fontFamily: "sans-serif !important",
          marginTop: "20px",
          "&:hover": { background: "#ffffff", color: "#000000" },
          padding: "10px 25px",
        }}
        onClick={() => {
          navigate("faqs");
        }}
      >
        More
      </Button>
      ):""}
    </Box>
  );
}
