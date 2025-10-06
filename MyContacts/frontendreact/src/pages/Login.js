// src/pages/Login.js
import { useState } from 'react';
import { loginUser } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser({ email, password });
            if (data.token) {
                localStorage.setItem('token', data.token);
                navigate('/contacts');
            } else {
                alert(data.message || 'Erreur lors de la connexion');
            }
        } catch (err) {
            console.error(err);
            alert('Erreur serveur');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Se connecter</button>
            </form>
            <p>
                Pas encore de compte ? <Link to="/register">S'inscrire</Link>
            </p>
        </div>
    );
};

export default Login;
