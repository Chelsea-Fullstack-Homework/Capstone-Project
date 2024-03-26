import "./CSS/Account.css"

export default function AccountButtonPopup({hovered}) {

    return (
        <div className={`popupwrapper ${!hovered? "notHovered":""}`}>
            <p>LOGIN</p>
            <hr />
            <p>SIGN UP</p>
        </div>
    )
}
