import AccountButtonPopup from "./AccountButtonPopup"

export default function AccountButton({token, setToken}) {

    return (
        <div className="accountbuttonwrapper">
            <AccountButtonPopup token={token} setToken={setToken}/>
        </div>
    )
}
