import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import NavBar from './Components/NavBar'
import AboutUs from './Components/AboutUs'
import LoginForm from './Components/LoginForm'
import ShowAllProducts from './Components/ShowAllProducts'
import SignUpForm from './Components/SignUpForm'
import SingleBook from './Components/SingleBook'
import TrackOrder from './Components/TrackOrder'
import Home from './Components/Home'
import Cart from './Components/Cart'
import Contact from './Components/Contact'
import ConfirmationPage from './Components/ConfirmationPage'
import './index.css'

function App() {
  const [token, setToken] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (item) => {
    setCartCount(prevCount => prevCount + 1);

    setCartItems(prevItems => [...prevItems, item]);
  };

  // useEffect(() => {
  //   try {
  //     setToken(localStorage.getItem('token'))
  //   } catch (error) {
  //     alert('no token found')
  //   }
  // }, [])

  return (
    <div>
      <div id="navbar">
        <NavBar token={token} cartCount={cartCount} setToken={setToken} setCartCount={setCartCount} setCartItems={setCartItems} />
      </div>
      <div id="mainarea">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/LoginForm" element={<LoginForm setUser={setUser} setToken={setToken} setCartItems={setCartItems} setCartCount={setCartCount}/>} />
          <Route path="/ShowAllProducts" element={<ShowAllProducts addToCart={addToCart} token={token} user={user} setCartItems={setCartItems} setCartCount={setCartCount}/>} />
          <Route path="/SignUpForm" element={<SignUpForm setUser={setUser} setToken={setToken} />} />
          <Route path="/SingleBook/:bookSku" element={<SingleBook addToCart={addToCart} token={token} user={user} setCartItems={setCartItems} setCartCount={setCartCount} />} />
          <Route path="/TrackOrder" element={<TrackOrder />} />
          <Route path="/Cart" element={<Cart token={token} user={user} cartItems={cartItems} setCartCount={setCartCount} setCartItems={setCartItems}/>} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/ConfirmationPage" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
