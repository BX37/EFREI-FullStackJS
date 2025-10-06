import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contacts from "./pages/Contacts";
import { AuthContext } from "./context/AuthContext";

const App = () => {
    const { token } = useContext(AuthContext);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<h1>Bienvenue sur MyContacts</h1>} />
                <Route path="/login" element={token ? <Navigate to="/contacts" /> : <Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contacts" element={token ? <Contacts /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
