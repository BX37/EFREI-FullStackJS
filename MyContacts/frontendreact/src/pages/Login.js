import { useState, useEffect } from 'react';
import { loginUser } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // État pour le message de succès/erreur
    const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour gérer la redirection
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(''); // Réinitialise le message
        try {
            const data = await loginUser({ email, password });
            if (data.token) {
                localStorage.setItem('token', data.token);
                setMessage('✅ Connexion réussie ! Redirection en cours...');
                setIsLoggedIn(true); // Active la redirection
            } else {
                setMessage(`❌ Erreur : ${data.message || 'Email ou mot de passe incorrect'}`);
            }
        } catch (err) {
            console.error(err);
            setMessage('❌ Erreur serveur, impossible de se connecter.');
        }
    };

    // Redirection après 4 secondes si la connexion est réussie
    useEffect(() => {
        if (isLoggedIn) {
            const timer = setTimeout(() => {
                navigate('/contacts');
            }, 4000); // 4 secondes
            return () => clearTimeout(timer); // Nettoyage du timer
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl font-bold mb-4">Connexion</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-3 w-80 p-4 border rounded-lg">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="p-2 border rounded"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Se connecter
                </button>
            </form>
            {message && (
                <p className={`mt-4 text-center font-medium ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
            <p className="mt-4">
                Pas encore de compte ? <Link to="/register" className="text-blue-600 hover:underline">S'inscrire</Link>
            </p>
        </div>
    );
};

export default Login;
