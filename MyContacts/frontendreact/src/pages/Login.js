import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser({ email, password });
            if (res.token) {
                localStorage.setItem('token', res.token);
                navigate('/contacts');
            } else {
                setError(res.message || 'Erreur login');
            }
        } catch (err) {
            setError('Erreur serveur');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Se connecter</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}
