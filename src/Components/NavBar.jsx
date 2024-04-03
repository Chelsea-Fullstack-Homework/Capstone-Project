import { Link } from "react-router-dom";
import AccountButton from './AccountButton'
import AddToCart from "./AddToCart";

export default function NavBar({token}) {
    return (
        <nav>
            <Link to="/Home">HOME</Link>
            <br />
            <Link to="/RecentlyAdded">RECENTLY ADDED</Link>
            <br />
            <Link to="/ShowAllProducts">SHOW ALL PRODUCTS</Link>
            <br />
            <Link to="/AboutUs">ABOUT US</Link>
            <br />
            <Link to="/Contact">CONTACT</Link>
            <br />
            <Link to="/TrackOrder">TRACK ORDER</Link>
            <br />
            <AddToCart />
            <AccountButton token={token}/>
        </nav>
    )
}