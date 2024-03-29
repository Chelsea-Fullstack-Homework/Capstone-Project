import "./CSS/Account.css"

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
                <a>LOGIN</a>
                <a>SIGNUP</a>
            </div>
        </div>
    )
}
