import React, { useState, useEffect } from "react";
import { singleBook } from "../API/API";

export default function Cart({ cartItems }) {
  // Mock data for items in cart
  const [bookArray, setBookArray] = useState([]);

  useEffect(()=>{
    const getBooks = async (cartItems) => {
      let arr = [];
      for(const item of cartItems){
        arr.push(await singleBook(item));
      }
      (arr)
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
    </div>
  );
}