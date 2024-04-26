import React, { useState } from "react";
import { loginUser } from "../services/productService"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const UserLoginView = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleLogin = async () => {
        const response = await loginUser(formData);
        if (response.data.token) {
            sessionStorage.setItem('token', `Bearer ${response.data.token}`);
            setMessage('ok');
            navigate('/catalog');
        }
        else {
            setMessage('Invalid email or password.');
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <div className="container my-4 w-25">
            <div className="row">
                <h3>Log In</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            className="form-control my-1 w-75"
                            placeholder="Email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <input
                            className="form-control my-1 w-75"
                            placeholder="Password"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        className="btn btn-primary my-2 w-75"
                        type="submit">Sign In
                    </button>
                </form>
                <p>Forgot your password? <Link to={'/userpwd1/'}>Reset</Link></p>
                <p>No account? <Link to={'/userregister/'}>Sign Up</Link></p>
                {!message || message === 'ok' ? '' : <p className="alert alert-warning"> {message} </p>}
            </div>
        </div>
    );
}