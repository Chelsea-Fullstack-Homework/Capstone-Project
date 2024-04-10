import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountButton from "./AccountButton";
import AddToCart from "./AddToCart";
import Cart from "./Cart";
import "./CSS/NavBar.css";

export default function NavBar({ token, cartCount, setToken }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartPopup = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.searchInput.value.trim();
    if (searchTerm !== "") {
      alert("Searching for: " + searchTerm);
    } else {
      alert("Please enter a search term");
    }
    event.target.elements.searchInput.value = "";
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
        <li><AccountButton token={token} setToken={setToken} /></li>
        <li><AddToCart cartCount={cartCount} onClick={toggleCartPopup} /></li>
      </ul>
      {isCartOpen && <Cart />}
      <form onSubmit={handleSearchSubmit} className="search-bar">
        <input type="text" name="searchInput" placeholder="Search..." className="search-input" />
        <button type="submit" className="search-button">
          <img src="https://cdn.pixabay.com/photo/2017/01/13/01/22/magnifying-glass-1976105_1280.png" alt="Search" className="search-icon" />
        </button>
      </form>
    </nav>
  );
};