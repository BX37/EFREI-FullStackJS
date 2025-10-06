const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { specs, swaggerUi } = require('./swagger');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/auth', authRoutes);
app.use('/contacts', contactRoutes);

// Connexion MongoDB + lancement serveur
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connecté');
        app.listen(process.env.PORT || 5000, () => console.log('🚀 Serveur lancé'));
    })
    .catch(err => console.error('❌ Erreur MongoDB:', err));
