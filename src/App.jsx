import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import NavBar from './Components/NavBar'
import AboutUs from './Components/AboutUs'
import AllSeries from './Components/AllSeries'
import BoxedSets from './Components/BoxedSets'
import LoginForm from './Components/LoginForm'
import MyAccount from './Components/MyAccount'
import RecentlyAdded from './Components/RecentlyAdded'
import ShopBySeries from './Components/ShopBySeries'
import SignUpForm from './Components/SignUpForm'
import SingleBook from './Components/SingleBook'
import TrackOrder from './Components/TrackOrder'
import './index.css'

function App() {
  const [token, setToken] = useState(null)

  return (
    <div>
      <div id="navbar">
        <NavBar />
      </div>
      <div id="mainarea">
        <Routes>
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/AllSeries" element={<AllSeries />} />
          <Route path="/BoxedSets" element={<BoxedSets />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/MyAccount" element={<MyAccount />} />
          <Route path="/RecentlyAdded" element={<RecentlyAdded />} />
          <Route path="/ShopBySeries" element={<ShopBySeries />} />
          <Route path="/SignUpForm" element={<SignUpForm />} />
          <Route path="/SingleBook" element={<SingleBook />} />
          <Route path="/TrackOrder" element={<TrackOrder />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
