import React from "react";

export default function CartPopup() {
  // Mock data for items in cart
  const cartItems = [
    { id: 1, name: "Item 1", price: "$10" },
    { id: 2, name: "Item 2", price: "$20" },
    { id: 3, name: "Item 3", price: "$15" }
  ];

  return (
    <div className="cart-popup">
      <h2>Items in Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}