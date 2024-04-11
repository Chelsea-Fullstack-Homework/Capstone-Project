import React, { useRef } from "react";
import "./CSS/Contact.css";

export default function Contact() {
    const formRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert("Email Sent!");
        formRef.current.reset();
    };

    return (
        <div className="contact-container">
            <div className="contactme">
                <h1>Contact</h1>
                <br /><br />
                <a href="mailto:rockyhilburn@gmail.com">Email Us Here</a>
            </div>
            <div className="form">
                <form autoComplete="on" onSubmit={handleFormSubmit} ref={formRef}>
                    <label htmlFor="fullname">Full Name:</label><br /><br />
                    <input id="fullname" type="text" placeholder="Full Name Here" required /><br />
                    <label htmlFor="email">Email:</label><br /><br />
                    <input id="email" type="email" placeholder="Email Here" required /><br />
                    <label htmlFor="subject">Subject:</label><br /><br />
                    <textarea id="subject" type="text" placeholder="Type Message Here" maxLength="1000"></textarea><br /><br />
                    <input type="submit" value="Submit" />
                </form>
            <img src="https://www.kyokovinyl.com/cdn/shop/products/komi.png?v=1640345085" className="contact-logo"></img>
            <img src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/danganronpa-trigger-happy-havoc/d/d2/Jun.png" className="contact-logo2"></img>
            </div>
        </div>
    );
}

