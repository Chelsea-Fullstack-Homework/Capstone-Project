import AccountButtonPopup from "./AccountButtonPopup"

export default function AccountButton() {

function handlehover() {
    // <AccountButtonPopup />
}

    return (
        <div className="accountbuttonwrapper">
            <h1 id="accountbutton" onMouseOver={handlehover}>Button</h1>
            <AccountButtonPopup />
        </div>
    )
}