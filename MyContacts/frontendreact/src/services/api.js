// src/services/api.js

const API_URL = 'https://efrei-fullstackjs-6.onrender.com'; // ton backend Render

// ➡️ Auth
export const registerUser = async (data) => {
    try {
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (err) {
        console.error('Erreur registerUser:', err);
        throw err;
    }
};

export const loginUser = async (data) => {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (err) {
        console.error('Erreur loginUser:', err);
        throw err;
    }
};

// ➡️ Contacts
export const getContacts = async (token) => {
    try {
        const res = await fetch(`${API_URL}/contacts`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return await res.json();
    } catch (err) {
        console.error('Erreur getContacts:', err);
        throw err;
    }
};

export const createContact = async (data, token) => {
    try {
        const res = await fetch(`${API_URL}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (err) {
        console.error('Erreur createContact:', err);
        throw err;
    }
};

export const updateContact = async (id, data, token) => {
    try {
        const res = await fetch(`${API_URL}/contacts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (err) {
        console.error('Erreur updateContact:', err);
        throw err;
    }
};

export const deleteContact = async (id, token) => {
    try {
        const res = await fetch(`${API_URL}/contacts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return await res.json();
    } catch (err) {
        console.error('Erreur deleteContact:', err);
        throw err;
    }
};
