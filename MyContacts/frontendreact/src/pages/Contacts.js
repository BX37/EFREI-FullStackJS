// src/pages/Contacts.js
import { useState, useEffect, useCallback } from 'react';
import { getContacts, createContact, updateContact, deleteContact } from '../services/api';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [editingContactId, setEditingContactId] = useState(null);

    const token = localStorage.getItem('token');

    // ➡️ Fetch contacts
    const fetchContacts = useCallback(async () => {
        try {
            const data = await getContacts(token);
            setContacts(data);
        } catch (err) {
            console.error('Erreur fetchContacts:', err);
        }
    }, [token]);

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    // ➡️ Ajouter un contact
    const handleAddContact = async (e) => {
        e.preventDefault();
        try {
            const newContact = await createContact({ firstName, lastName, phone }, token);
            setContacts(prev => [...prev, newContact]);
            setFirstName('');
            setLastName('');
            setPhone('');
        } catch (err) {
            console.error('Erreur handleAddContact:', err);
        }
    };

    // ➡️ Mettre à jour un contact
    const handleUpdateContact = async (id) => {
        try {
            const updated = await updateContact(id, { firstName, lastName, phone }, token);
            setContacts(prev => prev.map(c => c._id === id ? updated : c));
            setEditingContactId(null);
            setFirstName('');
            setLastName('');
            setPhone('');
        } catch (err) {
            console.error('Erreur handleUpdateContact:', err);
        }
    };

    // ➡️ Supprimer un contact
    const handleDeleteContact = async (id) => {
        try {
            await deleteContact(id, token);
            setContacts(prev => prev.filter(c => c._id !== id));
        } catch (err) {
            console.error('Erreur handleDeleteContact:', err);
        }
    };

    // ➡️ Remplir le formulaire pour l'édition
    const handleEdit = (contact) => {
        setEditingContactId(contact._id);
        setFirstName(contact.firstName);
        setLastName(contact.lastName);
        setPhone(contact.phone);
    };

    return (
        <div>
            <h1>Mes contacts</h1>

            <form onSubmit={editingContactId ? () => handleUpdateContact(editingContactId) : handleAddContact}>
                <input
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Téléphone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <button type="submit">{editingContactId ? 'Mettre à jour' : 'Ajouter'}</button>
            </form>

            <ul>
                {contacts.map(contact => (
                    <li key={contact._id}>
                        {contact.firstName} {contact.lastName} - {contact.phone}
                        <button onClick={() => handleEdit(contact)}>Éditer</button>
                        <button onClick={() => handleDeleteContact(contact._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Contacts;
