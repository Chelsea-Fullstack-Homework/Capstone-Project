import { singleBook } from "../API/API";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { updateBookAvailability } from "../API";

export default function SingleBook() {
    const { bookSku } = useParams();
    const [book, setBook] = useState(null);
    console.log(bookSku)
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(bookSku)
                const data = await singleBook(bookSku);
                setBook(data);
            } catch (error) {
            }
        };

        fetchData();
    }, [bookSku]);

    return (
        <div>
            <h2>Book Details</h2>
            {book && (
                <div>
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <img src={book.coverimage} alt={book.title} style={{ maxWidth: '200px' }} />
                    <p>Available: {book.in_inventory ? 'Yes' : 'No'}</p>
                    {/* Render Checkout button conditionally */}
                    {book.available && (
                        <button /*onClick={() => updateBookAvailability(bookSku, false)}*/>Add To Cart</button>
                    )}
                </div>
            )}
        </div>
    );
}