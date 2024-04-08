import { allProducts } from "../API/API";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import React from "react";
import "./CSS/ShowAllProducts.css";

export default function ShowAllProducts({ addToCart }) {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await allProducts();
                setBooks(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="products-container">
            <h2 className="products-heading">All Products</h2>
            <div className="product-grid">
                {Array.isArray(books) && books.map(book => (
                    <div key={book.sku} className="product-item">
                        <h3>{book.title}</h3>
                        <p>Author: {book.author}</p>
                        <p>Price: {book.price}</p>
                        <img src={book.coverimage} alt={book.title} style={{ maxWidth: '200px' }} />
                        <br/>
                        <p>Available: {book.in_inventory ? 'Yes' : 'No'}</p>
                        <Link to={`/SingleBook/${book.sku}`}>View Details</Link>
                        <br/>
                        <button onClick={() => addToCart(book)}>Add To Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
