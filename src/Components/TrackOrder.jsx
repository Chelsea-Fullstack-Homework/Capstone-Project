import React, { useState } from "react";
import "./CSS/TrackOrder.css";

export default function TrackOrder() {
    const [orderNumber, setOrderNumber] = useState('');

    const handleTrackOrder = () => {
        alert(`Tracking order number: ${orderNumber}`);
        setOrderNumber("");
    };

    return (
        <div className="track-order-container">
            <h1 className="title">Track Your Order</h1>
            <div className="search-bar">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Enter Order Number..."
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                />
                <button className="track-button" onClick={handleTrackOrder}>Track</button>
            </div>
            <img src="https://pngimg.com/d/naruto_PNG19.png" className="track-logo"></img>
            <img src="https://i.pinimg.com/originals/b7/9c/a3/b79ca30a7caed9b77a4fbcc39f47f3f9.png" className="track-logo2"></img>
        </div>
    );
}
