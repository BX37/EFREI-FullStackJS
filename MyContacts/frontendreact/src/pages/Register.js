import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerUser({ email, password });
            if (res.message === 'Utilisateur créé avec succès') {
                navigate('/login');
            } else {
                setError(res.message || 'Erreur inscription');
            }
        } catch (err) {
            setError('Erreur serveur');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">S'inscrire</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}
