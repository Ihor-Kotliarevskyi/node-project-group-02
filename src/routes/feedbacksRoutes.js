import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getFeedbacks,
  createFeedbackHandler,
} from '../controllers/feedbacksController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  createFeedbackSchema,
  paginationSchema,
} from '../validations/feedbacksValidation.js';

const router = Router();

router.get('/feedbacks/:locationId', celebrate(paginationSchema), getFeedbacks);

router.post(
  '/feedbacks/:locationId',
  authenticate,
  celebrate(createFeedbackSchema),
  createFeedbackHandler,
);

export default router;
