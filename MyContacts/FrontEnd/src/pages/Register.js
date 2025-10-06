// src/pages/Register.js
import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerUser({ email, password });
            if (res.token || res.message === 'Utilisateur créé avec succès') {
                setMessage('Compte créé avec succès ! Connectez-vous.');
                navigate('/login'); // redirige vers login
            } else {
                setMessage(res.message || 'Erreur lors de l’inscription');
            }
        } catch (err) {
            setMessage('Erreur serveur');
        }
    };

    return (
        <div>
            <h2>Register</h2>
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
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default Register;
