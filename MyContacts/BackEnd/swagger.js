const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MyContacts API',
            version: '1.0.0',
            description: 'API pour gérer les contacts',
        },
        servers: [
            {
                url: 'https://efrei-fullstackjs-6.onrender.com',
                description: 'Serveur de production',
            },
            {
                url: 'http://localhost:5000',
                description: 'Serveur de développement',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [], // Applique l'authentification JWT à toutes les routes
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
