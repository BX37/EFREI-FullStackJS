import React from "react";
import API from "../services/api";

const ContactList = ({ contacts, onContactDeleted }) => {
    const handleDelete = async (id) => {
        await API.delete(`/contacts/${id}`);
        onContactDeleted();
    };

    return (
        <ul>
            {contacts.map((c) => (
                <li key={c._id}>
                    {c.firstName} {c.lastName} - {c.phone}
                    <button onClick={() => handleDelete(c._id)}>Supprimer</button>
                </li>
            ))}
        </ul>
    );
};

export default ContactList;
