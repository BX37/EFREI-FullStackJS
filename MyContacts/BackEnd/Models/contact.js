const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: (v) => v.length >= 10 && v.length <= 20,
            message: 'Le numéro de téléphone doit faire entre 10 et 20 caractères.',
        },
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
