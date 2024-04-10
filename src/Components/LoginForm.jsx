import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginForm } from "../API/API";
import "./CSS/LoginForm.css";

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginForm(formData);
            navigate("/Home");
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    return (
        <div className="form-container">
            <div className="login-form">
                <h2>Login!</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    <input type="submit" value="Login" />
                </form>
                <p>Don't have an account? <Link to="/SignUpForm">Sign Up Here</Link></p>
            </div>
        </div>
    );
}
