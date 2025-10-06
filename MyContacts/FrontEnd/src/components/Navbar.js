import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav>
            <Link to="/">Accueil</Link>
            {token ? (
                <>
                    <Link to="/contacts">Contacts</Link>
                    <button onClick={handleLogout}>Déconnexion</button>
                </>
            ) : (
                <>
                    <Link to="/login">Connexion</Link>
                    <Link to="/register">Inscription</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
