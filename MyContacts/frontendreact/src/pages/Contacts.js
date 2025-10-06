// src/pages/Contacts.js
import React, { useState, useEffect, useContext } from 'react';
import { getContacts, createContact, updateContact, deleteContact } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Contacts = () => {
    const { token } = useContext(AuthContext);
    const [contacts, setContacts] = useState([]);
    const [form, setForm] = useState({ firstName: '', lastName: '', phone: '' });
    const [editingId, setEditingId] = useState(null);

    // 🔹 Charger les contacts
    useEffect(() => {
        if (!token) return;
        fetchContacts();
    }, [token]);

    const fetchContacts = async () => {
        const data = await getContacts(token);
        setContacts(data);
    };

    // 🔹 Ajouter ou mettre à jour un contact
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await updateContact(editingId, form, token);
            setEditingId(null);
        } else {
            await createContact(form, token);
        }
        setForm({ firstName: '', lastName: '', phone: '' });
        fetchContacts();
    };

    // 🔹 Supprimer un contact
    const handleDelete = async (id) => {
        await deleteContact(id, token);
        fetchContacts();
    };

    // 🔹 Éditer un contact
    const handleEdit = (contact) => {
        setForm({
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
        });
        setEditingId(contact._id);
    };

    return (
        <div>
            <h2>Mes contacts</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Prénom"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    required
                />
                <input
                    placeholder="Nom"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    required
                />
                <input
                    placeholder="Téléphone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                />
                <button type="submit">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
            </form>

            <ul>
                {contacts.map((c) => (
                    <li key={c._id}>
                        {c.firstName} {c.lastName} - {c.phone}{' '}
                        <button onClick={() => handleEdit(c)}>✏️</button>{' '}
                        <button onClick={() => handleDelete(c._id)}>🗑️</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Contacts;
