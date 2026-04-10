import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllUsersHandler,
  getMe,
  updateMe,
  getPublicUser,
  getPublicUserLocations,
} from '../controllers/usersController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  getUsersQuerySchema,
  updateProfileSchema,
} from '../validations/usersValidation.js';
import { paginationSchema } from '../validations/locationsValidation.js';

const router = Router();

router.get('/users', celebrate(getUsersQuerySchema), getAllUsersHandler);

router.get('/users/me', authenticate, getMe);

router.patch(
  '/users/me',
  authenticate,
  celebrate(updateProfileSchema),
  updateMe,
);

router.get('/users/:id', getPublicUser);

router.get(
  '/users/:id/locations',
  celebrate(paginationSchema),
  getPublicUserLocations,
);

export default router;
