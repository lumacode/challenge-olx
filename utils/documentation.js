const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Challenge OLX',
        version: '1.0.0',
      },
    },
    apis: ['./routes/client.js'],
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
