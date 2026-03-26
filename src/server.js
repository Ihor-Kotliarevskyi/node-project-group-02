import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import swaggerUi from 'swagger-ui-express';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import locationsRoutes from './routes/locationsRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import feedbacksRoutes from './routes/feedbacksRoutes.js';
import swaggerSpec from './docs/swaggerConfig.js';

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(logger);
app.use(express.json());
app.use(
  cors({
    origin:
      isProduction && process.env.FRONTEND_DOMAIN
        ? process.env.FRONTEND_DOMAIN
        : true,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API server documentations for RelaxMap web-site',
  }),
);

app.use(authRoutes);
app.use(usersRoutes);
app.use(locationsRoutes);
app.use(categoriesRoutes);
app.use(feedbacksRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
});
