// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./CSS/Home.css"

export default function Home() {
    return (
        <div className="home-container">
            <div className="background-image">
                <h1>Welcome to Our Website!</h1><br />
                <p>We are excited to have you here. Browse our collection of manga and enjoy reading!</p>
                <div className="explore-links">
                    <Link to="/ShowAllProducts">Explore Manga</Link>
                    <Link to="/Contact">Contact Us</Link>
                </div>
            </div>
        </div>
    );
}
