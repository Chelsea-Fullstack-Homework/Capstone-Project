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

  useEffect(() => {
    localStorage.removeItem('cartItems');
  }, []);


  return (
    <div className="confirmation-container">
      <h1>Thank you for your order!</h1>
      <p>Your order number is: <Link to="/TrackOrder" className="order-number-link">{orderNumber}</Link></p>
      <p>We've sent a confirmation email to your registered email address.</p>
      <Link to="/ShowAllProducts" className="shop-more-button">Shop More</Link>
      <img src="https://www.pngall.com/wp-content/uploads/14/Killua-PNG-Pic.png" className="conf-logo"></img>
      <img src="https://blood-fashion-chainsaw.carrd.co/assets/images/image02.png?v=0176b510" className="conf-logo2"></img>
      <img src="https://asia.sega.com/kimetsu_hinokami/en/assets/img/sub/character/chara3_thumb.png" className="conf-logo3"></img>
    </div>
  );
}
