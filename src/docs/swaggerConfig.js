import swaggerJSDoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RelaxMap REST API',
      version: '1.0.0',
      description: 'API server documentations for RelaxMap web-site',
    },
    servers: [{ url: '/', description: 'Dev server' }],
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
  apis: ['./src/docs/paths/*.js'],
});

export default swaggerSpec;
