import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerUser({ email, password });
            if (res.token || res.message === 'Utilisateur créé avec succès') {
                navigate('/'); // redirige vers login
            } else {
                alert(res.message || 'Erreur serveur');
            }
        } catch (err) {
            alert('Erreur serveur');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
