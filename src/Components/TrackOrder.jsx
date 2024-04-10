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
        </div>
    );
}
