import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getContacts, createContact, updateContact, deleteContact } from '../services/api';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [editingContactId, setEditingContactId] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchContacts = useCallback(async () => {
        if (!token) {
            navigate('/login');
            return;
        }

        setLoading(true);
        try {
            const data = await getContacts(token);
            console.log('Données reçues:', data); // Log pour vérifier la structure de la réponse
            if (Array.isArray(data)) {
                setContacts(data);
            } else {
                console.error('La réponse n\'est pas un tableau :', data);
                setMessage('❌ Erreur : les données reçues ne sont pas valides.');
            }
        } catch (err) {
            console.error('Erreur fetchContacts:', err);
            if (err.response) {
                console.error('Réponse du serveur:', err.response.data);
                setMessage(`❌ Erreur : ${err.response.data.message || 'Erreur inconnue'}`);
            } else {
                setMessage('❌ Erreur lors de la récupération des contacts.');
            }
        } finally {
            setLoading(false);
        }
    }, [token, navigate]);


    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);
    // ➡️ Ajouter un contact
    const handleAddContact = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const newContact = await createContact({ firstName, lastName, phone }, token);
            setContacts(prev => [...prev, newContact]);
            setFirstName('');
            setLastName('');
            setPhone('');
            setMessage('✅ Contact ajouté avec succès !');
        } catch (err) {
            console.error('Erreur handleAddContact:', err);
            setMessage('❌ Erreur lors de l\'ajout du contact.');
        }
    };

    // ➡️ Mettre à jour un contact
    const handleUpdateContact = async (e) => {
        e.preventDefault(); // Ajout de e.preventDefault() pour éviter le rechargement de la page
        setMessage('');
        try {
            const updated = await updateContact(editingContactId, { firstName, lastName, phone }, token);
            setContacts(prev => prev.map(c => c._id === editingContactId ? updated : c));
            setEditingContactId(null);
            setFirstName('');
            setLastName('');
            setPhone('');
            setMessage('✅ Contact mis à jour avec succès !');
        } catch (err) {
            console.error('Erreur handleUpdateContact:', err);
            setMessage('❌ Erreur lors de la mise à jour du contact.');
        }
    };

    // ➡️ Supprimer un contact
    const handleDeleteContact = async (id) => {
        try {
            await deleteContact(id, token);
            setContacts(prev => prev.filter(c => c._id !== id));
            setMessage('✅ Contact supprimé avec succès !');
        } catch (err) {
            console.error('Erreur handleDeleteContact:', err);
            setMessage('❌ Erreur lors de la suppression du contact.');
        }
    };

    // ➡️ Remplir le formulaire pour l'édition
    const handleEdit = (contact) => {
        setEditingContactId(contact._id);
        setFirstName(contact.firstName);
        setLastName(contact.lastName);
        setPhone(contact.phone);
    };

    // ➡️ Réinitialiser le formulaire
    const handleCancelEdit = () => {
        setEditingContactId(null);
        setFirstName('');
        setLastName('');
        setPhone('');
    };

    if (loading) {
        return <div>Chargement en cours...</div>;
    }
    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl font-bold mb-4">Mes contacts</h1>
            <form
                onSubmit={editingContactId ? handleUpdateContact : handleAddContact}
                className="flex flex-col gap-3 w-80 p-4 border rounded-lg"
            >
                <input
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Téléphone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="p-2 border rounded"
                />
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex-1"
                    >
                        {editingContactId ? 'Mettre à jour' : 'Ajouter'}
                    </button>
                    {editingContactId && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500 flex-1"
                        >
                            Annuler
                        </button>
                    )}
                </div>
            </form>
            {message && (
                <p className={`mt-4 text-center font-medium ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                    {message}
                </p>
            )}
            <ul className="mt-4 w-80">
                {contacts.map(contact => (
                    <li key={contact._id} className="flex justify-between items-center p-2 border-b">
                        <div>
                            <p className="font-medium">{contact.firstName} {contact.lastName}</p>
                            <p className="text-gray-600">{contact.phone}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(contact)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                                Éditer
                            </button>
                            <button
                                onClick={() => handleDeleteContact(contact._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Contacts;
