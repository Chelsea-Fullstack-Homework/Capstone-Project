import "./CSS/Account.css"

export default function AccountButtonPopup() {

    return (
        <div className="dropdown">
            <div className="dropdiv">Account</div>
            <div className="dropdown-content">
                <a>LOGIN</a>
                <a>SIGNUP</a>
            </div>
        </div>
    )
}
