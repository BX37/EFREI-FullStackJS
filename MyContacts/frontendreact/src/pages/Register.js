import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import pour la redirection
import { registerUser } from "../services/api";

export default function Register() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await registerUser(formData);
            if (res.error) {
                setMessage(` Erreur : ${res.error}`);
            } else {
                setMessage(" Utilisateur enregistré avec succès !");
                setIsRegistered(true); // Active la redirection
            }
        } catch (err) {
            setMessage(" Erreur serveur, impossible de s'enregistrer.");
        } finally {
            setLoading(false);
        }
    };

    // Redirection après 4 secondes si l'utilisateur est bien enregistré
    useEffect(() => {
        if (isRegistered) {
            const timer = setTimeout(() => {
                navigate("/login"); // Redirection vers la page de login
            }, 4000); // 4 secondes
            return () => clearTimeout(timer); // Nettoyage du timer
        }
    }, [isRegistered, navigate]);

    return (
        <div className="flex flex-col items-center mt-10">
            <h2 className="text-2xl font-bold mb-4">Créer un compte</h2>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-80 p-4 border rounded-lg"
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="p-2 border rounded"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    {loading ? "⏳ Enregistrement..." : "Register"}
                </button>
            </form>
            {message && (
                <p className="mt-4 text-center font-medium">
                    {message}
                </p>
            )}
        </div>
    );
}
