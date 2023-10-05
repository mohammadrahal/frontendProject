import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginStyle.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [login, setLogin] = useState('Login');
    const [userName, setUserName] = useState('Welcome Back');
    const navigate = useNavigate();

    const isEmailValid = (email) => {
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailPattern.test(email);
    };

    const checkLogin = async () => {
        if (!isEmailValid(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!password) {
            setError('Please enter a password.');
            return;
        }

        try {
            const loginUrl = 'http://localhost:5000/user/login';

            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    navigate('./Content');
                } else {
                    setError('Invalid email or password. Please try again.');
                }
            } else {
                setError('An error occurred. Please try again later.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    const handleLoginClick = async () => {
        await checkLogin();
    };


    return (
        <div className="container">
            <h1 className="login-title">{login}</h1>
            <h2 className="login-sub-title">{userName}</h2>
            <div className="input">
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleLoginClick} className="submit-btn">
                Login
            </button>
        </div>
    );
}

export default LoginPage;