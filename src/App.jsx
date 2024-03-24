import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import NavBar from './Components/NavBar'
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
          {/* <Route path="/Register" element={<Register />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App
