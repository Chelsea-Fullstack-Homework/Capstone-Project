import { addToCart } from "../API/API";

export default function AddToCartButton({ book, token, user, setCartItems, setCartCount }){

    async function sendToCart(book){
        // call the api
        const result = await addToCart(token, book, user);
        setCartItems(result.skulist); // returns an array
        setCartCount(result.skulist.length);
    }

    return(
        <button onClick={() => sendToCart(book)}>Add To Cart</button>
    )
}