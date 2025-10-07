const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { specs, swaggerUi } = require('./swagger');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware CORS
app.use(cors({
    origin: 'https://efrei-js.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.get('/create-test-contact', async (req, res) => {
    try {
        const user = await User.findOne({ email: 'test@example.com' });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur de test non trouvé' });
        }

        const testContact = new Contact({
            firstName: 'Test',
            lastName: 'Contact',
            phone: '0123456789',
            userId: user._id
        });
        await testContact.save();
        res.json({ message: 'Contact de test créé avec succès', contact: testContact });
    } catch (err) {
        console.error('Erreur lors de la création du contact de test:', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});


// Middleware pour parser le JSON
app.use(express.json());

//  Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/auth', authRoutes);
app.use('/contacts', contactRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route non trouvée' });
});

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(' MongoDB connecté');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(` Serveur lancé sur le port ${PORT}`);
        });
    })
    .catch(err => console.error(' Erreur MongoDB:', err));
