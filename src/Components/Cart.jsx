import React, { useState, useEffect } from "react";
import { singleBook, removeFromCart, getCart } from "../API/API";

export default function Cart({ token, user, cartItems, setCartCount, setCartItems }) {
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

  async function handleRemove(book){
    removeFromCart(token, book, user);

    let getResult = await getCart(token, user)
    setCartItems(getResult.message.skulist);
    setCartCount(getResult.message.skulist.length);
}

  return (
    <div className="cart-popup">
      <h2>Items in Cart</h2>
      <ul>
        {
          (bookArray.length > 0) ? (
            bookArray.map((item, index) => (
              <li key={index}>
                <div>
                  {item.title} - ${item.price}
                  <button onClick={()=>{handleRemove(item)}}>Remove Item</button>
                </div>
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