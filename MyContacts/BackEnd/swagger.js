const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'MyContacts API', version: '1.0.0' },
    },
    apis: ['./routes/*.js'], // Chemin vers tes routes
};
const specs = swaggerJsdoc(options);
module.exports = { specs, swaggerUi };
