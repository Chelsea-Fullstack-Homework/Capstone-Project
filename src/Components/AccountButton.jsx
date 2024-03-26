import AccountButtonPopup from "./AccountButtonPopup"
import {useState} from 'react'

export default function AccountButton() {
    const [hovered, setHovered] = useState(null);
    
    function handleHover(){
        // toggle the "notHovered" class on the popup component       
        setHovered(true);
    }

    function handleLeave(){
        setHovered(false);
    }
    return (
        <div className="accountbuttonwrapper">
            <h1 id="accountbutton" onMouseOver={handleHover} onMouseLeave={handleLeave}>Button</h1>
            <AccountButtonPopup hovered={hovered}/>
        </div>
    )
}
