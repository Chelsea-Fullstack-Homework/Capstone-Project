import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountButton from "./AccountButton";
import AddToCart from "./AddToCart";
import Cart from "./Cart";
import "./CSS/NavBar.css";

export default function NavBar({ token, cartCount }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartPopup = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/Home">HOME</Link></li>
        <li><Link to="/RecentlyAdded">RECENTLY ADDED</Link></li>
        <li><Link to="/ShowAllProducts">SHOW ALL PRODUCTS</Link></li>
        <li><Link to="/AboutUs">ABOUT US</Link></li>
        <li><Link to="/Contact">CONTACT</Link></li>
        <li><Link to="/TrackOrder">TRACK ORDER</Link></li>
        <li><AccountButton token={token} /></li>
        <li><AddToCart cartCount={cartCount} onClick={toggleCartPopup} /></li>
      </ul>
      {isCartOpen && <Cart />}
    </nav>
  );
}

