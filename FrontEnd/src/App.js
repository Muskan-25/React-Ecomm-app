import "./App.css";
import React from "react";
import Header from "./Components/Header/Nav";
import Home from "./Components/Body/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "./Components/Body/About/About";
import Contact from "./Components/Body/Contact/Contact";
import OurMenu from "./Components/Body/Menu/OurMenu";
import Shop from "./Components/Body/Shop/Shop";
import Faq from "./Components/Body/FAQ/Faq";
import ProductDetail from "./Components/Body/ProductDetail/ProductDetail";
import Footerr from "./Components/Footer/Footerr";
import Login from "./Components/Body/Login";
import Register from "./Components/Body/Register";
import Cart from "./Components/Body/Cart/Cart";

import Admin from "./Components/Body/Admin/Admin";
import Banner from "./Components/Body/Banner";
import Checkout from "./Components/Body/Checkout/Checkout";

export let handleLogout ;
function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [ navQuantity, setNavQuantity]= React.useState();
  const [totalPrice, setTotalPrice] = React.useState(0);
  
  React.useEffect(()=>{
    const checkAuthentication = () => {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const isAuthenticated = token ? true : false;
      setIsAuthenticated(isAuthenticated);
    };

    // Run the check initially
    checkAuthentication();

    // Listen for storage events (e.g., when the token is removed from localStorage)
    window.addEventListener('storage', checkAuthentication);
    checkAuthentication();

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', checkAuthentication);
    };
   
  },[])

  handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Update the authentication state
    setIsAuthenticated(false);
    setNavQuantity();
  };

  return (
    <div className="App">
      <Header navQuantity = {navQuantity}/>
      <Banner />
      <Routes>
        <Route path="/" element={<Navigate to="/cakeshop" />} />
        <Route path="/cakeshop" element={<Home />}></Route>
        <Route path="/cakeshop/about" element={<About />}></Route>
        <Route path="/cakeshop/menu" element={<OurMenu />}></Route>
        <Route path="/cakeshop/faqs" element={<Faq />}></Route>
        <Route path="/cakeshop/shop" element={<Shop />}></Route>
        <Route path="/cakeshop/product-detail" element={<ProductDetail />}></Route>
        <Route path="/cakeshop/contact" element={<Contact />}></Route>
        <Route path="/cakeshop/login" element={<Login />}></Route>
        <Route path="/cakeshop/register" element={<Register />}></Route>
        <Route path="/cakeshop/cart" element={<Cart setNavQuantity={setNavQuantity} setTotal={setTotalPrice}/>}></Route>
        <Route path="/cakeshop/checkout" element={<Checkout total={totalPrice} setNavQuantity={setNavQuantity}/>}></Route>

        {/*-------------------Admin--------------- */}
        <Route path="/cakeshop/admin" element={<Admin/>}></Route>
      </Routes>
      <Footerr />
    </div>
  );
}

export default App;