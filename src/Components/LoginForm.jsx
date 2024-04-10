import { loginForm } from "../API/API";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setToken }) {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let result = await loginForm(formData);
            setToken(result);
            navigate("/Home")
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    return (
        <div>
            <h2>Login!</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br />
                <label htmlFor="password">Password:</label><br />
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br /><br />
                <input type="submit" value="Login" />
            </form>
            <p>Don't have an account? <Link to="/SignUpForm">Sign Up Here</Link></p>
        </div>
    );
}