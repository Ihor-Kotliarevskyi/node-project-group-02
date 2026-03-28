import swaggerJSDoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RelaxMap REST API',
      version: '1.0.0',
      description: 'API server documentations for RelaxMap web-site',
    },
    servers: [{ url: process.env.APP_DOMAIN || "http://localhost:5000", description: 'Main server' }],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'accessToken',
        },
      },
    },
    security: [{ cookieAuth: [] }],
  },
  apis: [
    './paths/schemasDoc.js',
    './paths/authDoc.js',
    './paths/usersDoc.js',
    './paths/locationsDoc.js',
    './paths/categoriesDoc.js',
    './paths/feedbacksDoc.js',
  ],
});

export default swaggerSpec;
