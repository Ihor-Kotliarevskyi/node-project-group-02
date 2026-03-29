import swaggerJSDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RelaxMap REST API',
      version: '1.0.0',
      description: 'API server documentations for RelaxMap web-site',
    },
    servers: [{ 
      url: process.env.APP_DOMAIN || "http://localhost:5000", 
      description: '' 
    }],
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
    join(__dirname, 'paths', 'schemasDoc.js'),
    join(__dirname, 'paths', 'authDoc.js'),
    join(__dirname, 'paths', 'usersDoc.js'),
    join(__dirname, 'paths', 'locationsDoc.js'),
    join(__dirname, 'paths', 'categoriesDoc.js'),
    join(__dirname, 'paths', 'feedbacksDoc.js'),
  ],
});

export default swaggerSpec;
