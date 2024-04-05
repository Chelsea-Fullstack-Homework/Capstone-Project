import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountButton from "./AccountButton";
import AddToCart from "./AddToCart";
import CartPopup from "./Cart";

export default function NavBar({ token, cartCount, setToken }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartPopup = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <nav>
      <Link to="/Home">HOME</Link>
      <br />
      <Link to="/RecentlyAdded">RECENTLY ADDED</Link>
      <br />
      <Link to="/ShowAllProducts">SHOW ALL PRODUCTS</Link>
      <br />
      <Link to="/AboutUs">ABOUT US</Link>
      <br />
      <Link to="/Contact">CONTACT</Link>
      <br />
      <Link to="/TrackOrder">TRACK ORDER</Link>
      <br />
      <AccountButton token={token} setToken={setToken}/>
      <br />
      <AddToCart cartCount={cartCount} onClick={toggleCartPopup} />
      {isCartOpen && <CartPopup />}
    </nav>
  );
}