import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import NavBar from './Components/NavBar'
import AboutUs from './Components/AboutUs'
import AllSeries from './Components/AllSeries'
import BoxedSets from './Components/BoxedSets'
import LoginForm from './Components/LoginForm'
import MyAccount from './Components/MyAccount'
import RecentlyAdded from './Components/RecentlyAdded'
import ShowAllProducts from './Components/ShowAllProducts'
import SignUpForm from './Components/SignUpForm'
import SingleBook from './Components/SingleBook'
import TrackOrder from './Components/TrackOrder'
import AddToCart from './Components/AddToCart'
import Home from './Components/Home'
import Cart from './Components/Cart'
import Contact from './Components/Contact'
import ConfirmationPage from './Components/ConfirmationPage'
import './index.css'

function App() {
  const [token, setToken] = useState(null)
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartCount(prevCount => prevCount + 1);

    setCartItems(prevItems => [...prevItems, item]);
  };

  useEffect(() => {
    try {
      setToken(localStorage.getItem('token'))
    } catch (error) {
      alert('no token found')
    }
  }, [])

  return (
    <div>
      <div id="navbar">
        <NavBar token={token} cartCount={cartCount} setToken={setToken} />
      </div>
      <div id="mainarea">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/AllSeries" element={<AllSeries />} />
          <Route path="/BoxedSets" element={<BoxedSets />} />
          <Route path="/LoginForm" element={<LoginForm setToken={setToken}/>} />
          <Route path="/MyAccount" element={<MyAccount />} />
          <Route path="/RecentlyAdded" element={<RecentlyAdded />} />
          <Route path="/ShowAllProducts" element={<ShowAllProducts addToCart={addToCart} />} />
          <Route path="/SignUpForm" element={<SignUpForm setToken={setToken} />} />
          <Route path="/SingleBook" element={<SingleBook />} />
          <Route path="/SingleBook/:bookSku" element={<SingleBook addToCart={addToCart} />} />
          <Route path="/TrackOrder" element={<TrackOrder />} />
          <Route path="/AddToCart" element={<AddToCart />} />
          <Route path="/Cart" element={<Cart cartItems={cartItems} />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/ConfirmationPage" element={<ConfirmationPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
