import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import ShopPageCard from "../ShopPageCard";
import CircularProgress from "@mui/material/CircularProgress";
import SnackBar from "../../SnackBar";

function ProductDetail() {
  const [data, setData] = React.useState("");
  const [relatedProducts, setRelatedProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const id = new URLSearchParams(location.search).get("id");
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
  });

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/cakes_data/${id}`);
        response.data.map((doc) => {
          setLoading(false);
          setData(doc);
        });

        //----------------fetch related products------------------
        setLoading(true);
        const resp2 = await axios.get(`http://localhost:4000/cakes_data`);
        const relatedprod = resp2.data.filter((doc) => doc._id !== id);
        setLoading(false);
        setRelatedProducts(relatedprod);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  const handleClick = async (cake_id) => {
    try {
      let user_id = localStorage.getItem("token");
      if (user_id) {
        const cartDetails = {
          user_id,
          cake_id,
          quantity: 1,
        };
        const req_cartDetails = await axios.post("http://localhost:4000/cart/", cartDetails);
        if(req_cartDetails.data.message === "success"){
          setSnackbar({
            open: true,
            message: "Item added to cart successfully.",
          });
          setTimeout(()=>{navigate('../cakeshop/cart')},2000);
        }else if(req_cartDetails.data.message === "item already exists."){
          const existing_item_id = req_cartDetails.data.existing_item._id;
          const qty = req_cartDetails.data.existing_item.quantity;
          const updateCart = await axios.put(`http://localhost:4000/cartupdate/${existing_item_id}`,{quantity:qty+1});
          if(updateCart.data.message === "success"){
            setSnackbar({
              open: true,
              message: "Item updated.",
            });
            setTimeout(()=>{navigate('../cakeshop/cart')},2000);
          }
        }
      } else {
        setSnackbar({
          open: true,
          message: "Item failed to be added. Please Login and try again.",
        });
        setTimeout(() => {
          navigate("../cakeshop/login");
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Box
        sx={{
          background: "url('../about2.jpg')",
          padding: { sm: "50px 10%", xs: "50px 15px" },
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          /* ------------Product Detail----------------- */
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { md: "repeat(2,1fr)", xs: "1fr" },
                justifyContent: "center",
                padding: { md: "20px 0", xs: "20px 0" },
                gap: "30px",
              }}
            >
              <Box
                sx={{
                  padding: "20px",
                  border: "2px solid #5fcac78c",
                  borderRadius: "6px",
                  background :`url(${data.img}) no-repeat center`,
                  backgroundSize: "cover",
                  height:{md:'auto', xs:'200px'}
                }}
                
              ></Box>
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "22px",
                    fontWeight: "800",
                    marginBottom: "10px",
                  }}
                >
                  {data.cake_name}
                </Typography>
                <Typography
                  component="pre"
                  sx={{
                    fontSize: "16px",
                    fontFamily: "Poppins !important",
                    marginBottom: "10px",
                    wordWrap: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {data.description}
                </Typography>
                <Typography sx={{ fontSize: "20px", marginBottom: "10px" }}>
                  &#8377;{data.price}
                </Typography>
                <Button
                  sx={{
                    background: "#5fcac7",
                    fontFamily: "Poppins !important",
                    color: "#fff",
                    "&:hover": { fontWeight: "800", color: "#5fcac7" },
                    margin: "5px 0",
                    fontSize: { sm: "16px", xs: "12px" },
                  }}
                  onClick={()=>{handleClick(data._id)}}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
            {/* ------------Related Products----------------- */}
            <Box sx={{ textAlign: "left", padding: { md: "20px 0", xs: "0" } }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "22px",
                  fontWeight: "800",
                  marginBottom: "20px",
                }}
              >
                Related Products
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    lg: "repeat(4,1fr)",
                    md: "repeat(3,1fr)",
                    sm: "repeat(2,1fr)",
                    xs: "1fr",
                  },
                  justifyContent: "center",
                  gap: { md: "30px", xs: "15px" },
                }}
              >
                {relatedProducts.map((product, i) => {
                  return (
                    <ShopPageCard
                      key={i}
                      id={product._id}
                      cake_name={product.cake_name}
                      price={product.price}
                      img={product.img}
                      handleClick={()=>{handleClick(product._id)}}
                    />
                  );
                })}
              </Box>
            </Box>
          </>
        )}

      </Box>
      <SnackBar
              open={snackbar.open}
              message={snackbar.message}
              handleSnackbarClose={handleSnackbarClose}
            />
    </>
  );
}

export default ProductDetail;
