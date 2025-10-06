const Contact = require('MyContacts/BackEnd/Models/contact.js');

// ➡️ GET tous les contacts de l’utilisateur (déjà fait)
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.userId });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// ➡️ POST (créer un contact)
exports.createContact = async (req, res) => {
    try {
        const { firstName, lastName, phone, email } = req.body;

        const contact = new Contact({
            firstName,
            lastName,
            phone,
            email,
            userId: req.userId, // 👈 associer au user connecté
        });

        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ➡️ PATCH (mettre à jour un contact existant)
exports.updateContact = async (req, res) => {
    try {
        const { id } = req.params;

        // On vérifie que le contact appartient bien à l’utilisateur connecté
        const contact = await Contact.findOneAndUpdate(
            { _id: id, userId: req.userId },
            req.body,
            { new: true, runValidators: true }
        );

        if (!contact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }

        res.json(contact);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ➡️ DELETE (supprimer un contact)
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findOneAndDelete({ _id: id, userId: req.userId });

        if (!contact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }

        res.json({ message: 'Contact supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
