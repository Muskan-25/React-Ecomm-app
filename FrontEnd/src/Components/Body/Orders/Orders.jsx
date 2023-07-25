import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const resp = (
          await axios.get("https://cakeshop-api-o8x3.onrender.com/orders_data")
        ).data.orders.map((item) => {
          return item;
        });
        console.log(resp);
        setOrders(resp);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchOrders();
  }, []);
  return (
    <>
      <Box
        sx={{
          background: "url('../about2.jpg')",
          padding: { sm: "50px 25%", xs: "50px 15px" },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Poppins !important",
            fontSize: "25px",
            marginBottom: "20px",
          }}
        >
          Orders
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell className="ordersDataHeading">Name</TableCell>
                    <TableCell className="ordersDataHeading">Email</TableCell>
                    <TableCell className="ordersDataHeading">Phone</TableCell>
                    <TableCell className="ordersDataHeading">Address</TableCell>
                    <TableCell className="ordersDataHeading">Orders</TableCell>
                    <TableCell className="ordersDataHeading">Amount Payable</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((item, index) => {
                    const cake_names = item.orders.map((order) => {
                      const data = order.cake_name;
                      return data;
                    });
                    const qty = item.orders.map((order) => {
                      const data = order.quantity;
                      return data;
                    });
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          className="ordersData"
                          component="th"
                          scope="row"
                        >
                          {item.name}
                        </TableCell>
                        <TableCell className="ordersData">
                          {item.email}
                        </TableCell>
                        <TableCell className="ordersData">
                          {item.phone}
                        </TableCell>
                        <TableCell className="ordersData">
                          {item.address}
                        </TableCell>
                        <TableCell className="ordersData">
                          {cake_names.map((cakeName, index) => (
                            <div className="ordersData"> {index+1}: {""}
                            <React.Fragment key={index} >
                              Cake Name: {cakeName}
                              <br />
                              Quantity: {qty[index]}
                            </React.Fragment>
                            </div>
                          ))}
                        </TableCell>
                        <TableCell className="ordersData">
                          &#8377;{item.amount_payable}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </>
            )}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Orders;
