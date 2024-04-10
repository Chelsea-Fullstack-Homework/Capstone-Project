import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to Our Website!</h1>
            <p>We are excited to have you here. Browse our collection of books and enjoy reading!</p>
            <div className="explore-links">
                <Link to="/ShowAllProducts">Explore Books</Link>
                <Link to="/Contact">Contact Us</Link>
            </div>
        </div>
    );
}