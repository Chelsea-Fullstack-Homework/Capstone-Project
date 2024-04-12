import React, { useState, useEffect } from "react";
import { singleBook, removeFromCart, getCart } from "../API/API";
import { Link } from "react-router-dom";
import "./CSS/Cart.css"

export default function Cart({ token, user, cartItems, setCartCount, setCartItems }) {
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
    <div className="cart-container">
      <div className="cart-popup">
        <h2>Items in Cart</h2><br />
        <ul>
          {
            (bookArray.length > 0) ? (
              bookArray.map((item, index) => (
                <li key={index}>
                  <div className="cart-item">
                    <span>{item.title} - ${item.price}</span>
                    <button onClick={()=>{handleRemove(item)}}>Remove Item</button>
                  </div>
                </li>
              ))  
            ):(
              <li>No Items In Cart!</li>
            )
          }
        </ul>
        <div className="checkout-container">
          <Link to="/ConfirmationPage">
            <button className="checkout-btn">Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
