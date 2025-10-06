// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { setToken } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser({ email, password });
            if (res.token) {
                setToken(res.token); // stocke le token dans le context
                localStorage.setItem('token', res.token);
                navigate('/contacts');
            } else {
                setMessage(res.message || 'Identifiants invalides');
            }
        } catch (err) {
            setMessage('Erreur serveur');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;
