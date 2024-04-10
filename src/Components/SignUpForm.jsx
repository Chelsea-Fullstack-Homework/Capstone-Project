import { signupForm } from "../API/API";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/SignUpForm.css"

export default function SignUpForm({setToken}) {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword(formData.password)) {
            setPasswordError('Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.');
            return;
        }
        try {
            let result = await signupForm(formData);
            setToken(result)
            navigate("/Home")
        } catch (error) {
            console.error('Sign Up Error:', error);
        }
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <div id="id01" className="modal">
            <h2>Sign Up!</h2>
            <form onSubmit={handleSubmit} className="modal-content animate" action="/action_page.php" method="post">
                <label htmlFor="firstname">First Name:</label><br />
                <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} /><br />
                <label htmlFor="lastname">Last Name:</label><br />
                <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} /><br />
                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br />
                <label htmlFor="password">Password:</label><br />
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required /><br />
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                <br />
                <input type="submit" value="Sign Up" />
            </form>
            <p>Already have an account? <Link to="/LoginForm">Login Here</Link></p>
        </div>
    );
}