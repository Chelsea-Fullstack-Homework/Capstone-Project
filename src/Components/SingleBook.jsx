import { singleBook } from "../API/API";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import "./CSS/SingleBook.css";

export default function SingleBook({ addToCart }) {
    const { bookSku } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await singleBook(bookSku);
                setBook(data[0]);
            } catch (error) {
            }
        };

        fetchData();
    }, [bookSku]);

    return (
        <div className="single-book-container">
            <h2 className="book-details-title">Book Details</h2>
            {book && (
                <div className="book-details">
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>Price: ${book.price}</p>
                    <div className="image-container">
                        <img src={book.coverimage} alt={book.title} className="book-image" />
                    </div>
                    <p className="desc">Description:<br /> {book.description}</p>
                    <p>Available: {book.is_available ? 'Yes' : 'No'}</p>
                    <button onClick={() => addToCart(book)}>Add To Cart</button>
                </div>
            )}
        </div>
    );
}
