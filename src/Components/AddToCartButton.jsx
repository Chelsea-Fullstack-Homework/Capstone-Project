import { addToCart } from "../API/API";

export default function AddToCartButton({ book, token, user }){

    async function sendToCart(book){
        // call the api
        const result = await addToCart(token, book, user);
    }

    return(
        <button onClick={() => sendToCart(book)}>Add To Cart</button>
    )
}