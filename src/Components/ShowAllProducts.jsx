import { allProducts } from "../API/API";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import React from "react";

export default function ShowAllProducts({ addToCart }) {
// CODE FOR SITE


    // const [books, setBooks] = useState([]);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = await allProducts();
    //             console.log(data)
    //             setBooks(data);
    //         } catch (error) {
    //             setError(error.message);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // return (
    //     <div>
    //         <h2>All Products</h2>
    //         {Array.isArray(books) && books.map(book => (
    //             <div key={book.sku}>
    //                 <h3>{book.title}</h3>
    //                 <p>Author: {book.author}</p>
    //                 <p>Price: {book.price}</p>
    //                 <img src={book.coverimage} alt={book.title} style={{ maxWidth: '200px' }} />
    //                 <p>Available: {book.in_inventory ? 'Yes' : 'No'}</p>
    //                 <Link to={`/SingleBook/${book.sku}`}>View Details</Link>
    //             </div>
    //         ))}
    //     </div>
    // );

//TESTING CODE

    const items = [
        {
            id: 1,
            name: "book",
            price: "$3.50",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBw-gVrNDrFJGSnh8JJ4Fo8NwT21keb0a--CfN-M4uQ&s"
        }, 
        {
            id: 2,
            name: "chair",
            price: "$15.50",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnjvKpiJobVJ6dCTbhLq2DDppiSuIsA0MhpHt7tJXFvw&s"
        }, 
        {
            id: 3,
            name: "table",
            price: "$25.50",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT639ipP2RtccKJMP4-jfFRMPtgj6de0i2EUuHpXNghog&s"
        }
    ]

    return (
        <>
            {items.map((item) => (
                <div key={item.id}>
                    <img src={item.img} alt={item.name} />
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                    <button onClick={addToCart}>Add To Cart</button>
                </div>
            ))}
        </>
    )
}