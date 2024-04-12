import "./CSS/Account.css"
import { Link } from "react-router-dom"

export default function AccountButtonPopup({ token, setToken, setCartCount, setCartItems }) {

function handleClick(){
    localStorage.removeItem("token")
    setToken(null)
    setCartCount(0)
    setCartItems([])
}

    return (
        <div className="dropdown">

            {
                token ?
                    <div>
                        <div className="dropdiv">ACCOUNT</div>
                        <div className="dropdown-content">
                            <Link to="/MyAccount">My Account</Link>
                            <Link to="/Cart">My Cart</Link>
                            <div onClick={()=>{handleClick()}}>Sign Out</div>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="dropdiv">LOGIN</div>
                        <div className="dropdown-content">
                            <Link to="/LoginForm">Login</Link>
                            <Link to="/SignUpForm">Sign Up</Link>
                        </div>
                    </div>
            }
        </div>
    )
}
