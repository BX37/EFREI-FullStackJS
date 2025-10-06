const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { specs, swaggerUi } = require('./swagger');
const authRoutes = require('./routes/login.js');
const contactRoutes = require('./routes/contactRoutes.js');
const { authenticate } = require('/middleware.js');

const app = express();

// Middleware global
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes publiques
app.use('/auth', authRoutes);

// Routes protégées (toutes les routes /contacts nécessitent un JWT)
app.use('/contacts', authenticate, contactRoutes);

// Connexion à MongoDB + démarrage serveur
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .t
