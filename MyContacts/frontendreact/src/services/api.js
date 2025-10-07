// src/services/api.js

const API_URL = process.env.REACT_APP_API_URL; // backend Render depuis Netlify

// ➡️ Auth
export const registerUser = async (data) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const getContacts = async (token) => {
    try {
        const res = await fetch('https://efrei-fullstackjs-6.onrender.com/contacts', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Erreur serveur');
        }

        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Erreur getContacts:', err);
        throw err;
    }
};

export const createContact = async (data, token) => {
    const res = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const loginUser = async (data) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
};



export const updateContact = async (id, data, token) => {
    const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const deleteContact = async (id, token) => {
    const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
};
