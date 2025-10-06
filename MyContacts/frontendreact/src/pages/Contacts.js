import { useState, useEffect } from 'react';
import { getContacts, createContact, updateContact, deleteContact } from '../services/api';

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]); // pour supprimer lesproblèmes de dépendances dans Netlify

    const fetchContacts = async () => {
        const data = await getContacts(token);
        setContacts(data);
    };

    const handleAdd = async () => {
        await createContact({ firstName, lastName, phone }, token);
        setFirstName(''); setLastName(''); setPhone('');
        fetchContacts();
    };

    const handleDelete = async (id) => {
        await deleteContact(id, token);
        fetchContacts();
    };

    const handleUpdate = async (id) => {
        const newPhone = prompt('Nouveau téléphone ?');
        if (!newPhone) return;
        await updateContact(id, { phone: newPhone }, token);
        fetchContacts();
    };

    return (
        <div>
            <h2>Contacts</h2>
            <div>
                <input placeholder="Prénom" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <input placeholder="Nom" value={lastName} onChange={e => setLastName(e.target.value)} />
                <input placeholder="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} />
                <button onClick={handleAdd}>Ajouter</button>
            </div>
            <ul>
                {contacts.map(c => (
                    <li key={c._id}>
                        {c.firstName} {c.lastName} - {c.phone}
                        <button onClick={() => handleUpdate(c._id)}>Modifier</button>
                        <button onClick={() => handleDelete(c._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
