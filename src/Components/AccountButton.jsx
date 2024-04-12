import AccountButtonPopup from "./AccountButtonPopup"

export default function AccountButton({token, setToken, setCartCount, setCartItems}) {

    return (
        <div className="accountbuttonwrapper">
            <AccountButtonPopup token={token} setToken={setToken} setCartCount={setCartCount} setCartItems={setCartItems}/>
        </div>
    )
}
