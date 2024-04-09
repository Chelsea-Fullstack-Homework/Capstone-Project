import AccountButtonPopup from "./AccountButtonPopup"

export default function AccountButton({token}) {

    return (
        <div className="accountbuttonwrapper">
            <AccountButtonPopup token={token}/>
        </div>
    )
}
