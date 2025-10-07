const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { specs, swaggerUi } = require('./swagger');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

app.use(cors({
    origin: 'https://efrei-js.netlify.app', // Remplace par ton URL Netlify exacte
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));


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
