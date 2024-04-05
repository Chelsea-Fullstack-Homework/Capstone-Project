import { allProducts } from "../API/API";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import React from "react";

export default function ShowAllProducts({ addToCart }) {


    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await allProducts();
                console.log(data)
                setBooks(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>All Products</h2>
            {Array.isArray(books) && books.map(book => (
                <div key={book.sku}>
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>Price: {book.price}</p>
                    <img src={book.coverimage} alt={book.title} style={{ maxWidth: '200px' }} />
                    <p>Available: {book.in_inventory ? 'Yes' : 'No'}</p>
                    <Link to={`/SingleBook/${book.sku}`}>View Details</Link>
                    <button onClick={addToCart}>Add To Cart</button>
                </div>
            ))}
        </div>
    );
}