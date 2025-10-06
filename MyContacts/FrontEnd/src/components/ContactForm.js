import React, { useState } from "react";
import API from "../services/api";

const ContactForm = ({ onContactAdded }) => {
    const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/contacts", form);
        setForm({ firstName: "", lastName: "", phone: "" });
        onContactAdded();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="firstName" placeholder="Prénom" value={form.firstName} onChange={handleChange} />
            <input name="lastName" placeholder="Nom" value={form.lastName} onChange={handleChange} />
            <input name="phone" placeholder="Téléphone" value={form.phone} onChange={handleChange} />
            <button type="submit">Ajouter</button>
        </form>
    );
};

export default ContactForm;
