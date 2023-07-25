import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import AboutUsSection from "../About/AboutUsSection";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function OurMenu() {
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const resp = await axios.get("http://localhost:4000/cakes_data/");
        setLoading(false);
        setItems(resp.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchItems();
  }, []);
  return (
    <>
      <Box
        sx={{
          background: "url('../about2.jpg') center",
          backgroundSize: "cover",
          padding: "50px 0",
        }}
      >
        <AboutUsSection title="Our Cakes Menu" />
        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "repeat(2,1fr)" },
              gap: "30px",
              padding: { xs: "0 15px" },
              width: { md: "1080", sm: "650", xs: "280" },
              justifyContent: "center",
              margin: { lg: "0 10%" },
            }}
          >
            {items.map((item,index) => {
              return (
                <Box sx={{ width: { lg: "555px" }, textAlign: "left" }} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      placeItems: "baseline",
                    }}
                  >
                    <TaskAltIcon
                      sx={{
                        color: "#5fcac7",
                        fontSize: "20px",
                        marginRight: "5px",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "22px",
                        fontFamily: "Poppins !important",
                      }}
                    >
                      {item.cake_name}
                    </Typography>
                    <Divider
                      sx={{
                        borderBottom: "1px dotted #5fcac7",
                        margin: "0 7px 6px",
                        flexGrow: 1,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "22px",
                        color: "#5fcac7",
                        fontFamily: "Poppins !important",
                        fontWeight: "800",
                      }}
                    >
                      &#8377;{item.price}
                    </Typography>
                  </Box>
                  <Typography
                    variant="p"
                    sx={{
                      fontFamily: "Poppins !important",
                      fontSize: "16px",
                      color: "#bfbfbf",
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur elit
                  </Typography>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </>
  );
}

export default OurMenu;
