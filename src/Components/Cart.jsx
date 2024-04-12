import React, { useState, useEffect } from "react";
import { singleBook } from "../API/API";

export default function Cart({ cartItems }) {
  // Mock data for items in cart
  const [bookArray, setBookArray] = useState([]);

  useEffect(()=>{
    const getBooks = async (cartItems) => {
      let arr = [];
      for(const item of cartItems){
        let result = await singleBook(item);
        arr.push(result[0]);
      }
      setBookArray(arr);
    };
    getBooks(cartItems);

  },[cartItems])

  return (
    <div className="cart-popup">
      <h2>Items in Cart</h2>
      <ul>
        {
          (bookArray.length > 0) ? (
            bookArray.map((item, index) => (
              <li key={index}>
                {item.title} - ${item.price}
              </li>
            ))  
          ):(
            <li>No Items In Cart!</li>
          )
        }
      </ul>
            {/* Button to navigate to ConfirmationPage and clear cart */}
            <Link to="/confirmation-page">
        <button onClick={handleClearCart}>Proceed to Checkout</button>
      </Link>

    </div>
  );
}