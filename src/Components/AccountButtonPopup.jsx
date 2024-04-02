import "./CSS/Account.css"
import { Link } from "react-router-dom"

export default function AccountButtonPopup({token}) {

    return (
        <div className="dropdown">

            {
                token ?
                    <div className="dropdiv">Account</div>
                    :
                    <div className="dropdiv">Login</div>
            }

            <div className="dropdown-content">
                <Link to="/LoginForm">LOGIN</Link>
                <Link to="/SignUpForm">SIGN UP</Link>
            </div>
        </div>
    )
}
