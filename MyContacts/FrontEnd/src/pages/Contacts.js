import React, { useEffect, useState } from "react";
import API from "../services/api";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";

const Contacts = () => {
    const [contacts, setContacts] = useState([]);

    const fetchContacts = async () => {
        const res = await API.get("/contacts");
        setContacts(res.data);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div>
            <h2>Mes Contacts</h2>
            <ContactForm onContactAdded={fetchContacts} />
            <ContactList contacts={contacts} onContactDeleted={fetchContacts} />
        </div>
    );
};

export default Contacts;
