// src/services/api.js

const API_URL = process.env.REACT_APP_API_URL; // backend Render depuis Netlify

// ➡️ Auth
export const registerUser = async (data) => {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
};

export const loginUser = async (data) => {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
};

// ➡️ Contacts
export const getContacts = async (token) => {
    const res = await fetch(`${API_URL}/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
};

export const createContact = async (data, token) => {
    const res = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
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
