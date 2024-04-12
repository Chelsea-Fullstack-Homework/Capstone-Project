import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/ConfirmationPage.css';

function generateOrderNumber() {
  let orderNumber = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 2; i++) {
    orderNumber += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  orderNumber += '-';
  for (let i = 0; i < 5; i++) {
    orderNumber += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  orderNumber += '-';
  for (let i = 0; i < 5; i++) {
    orderNumber += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return orderNumber;
}

export default function ConfirmationPage() {
  const orderNumber = generateOrderNumber();

  return (
    <div className="confirmation-container">
      <h1>Thank you for your order!</h1>
      <p>Your order number is: <Link to="/TrackOrder" className="order-number-link">{orderNumber}</Link></p>
      <p>We've sent a confirmation email to your registered email address.</p>
      <Link to="/ShowAllProducts" className="shop-more-button">Shop More</Link>
    </div>
  );
}
