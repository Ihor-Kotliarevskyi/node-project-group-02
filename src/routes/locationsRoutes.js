import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createLocationHandler,
  deleteLocationHandler,
  getAllLocationsHandler,
  getLocationByIdHandler,
  updateLocationHandler,
} from '../controllers/locationsController.js';
import { authenticate } from '../middleware/authenticate.js';

import {
  createLocationSchema,
  idParamSchema,
  paginationSchema,
  updateLocationSchema,
} from '../validations/locationsValidation.js';

const router = Router();

router.get('/locations', celebrate(paginationSchema), getAllLocationsHandler);

router.post(
  '/locations',
  authenticate,
  celebrate(createLocationSchema),
  createLocationHandler,
);

router.get('/locations/:id', celebrate(idParamSchema), getLocationByIdHandler);

router.patch(
  '/locations/:id',
  authenticate,
  celebrate({ ...idParamSchema, ...updateLocationSchema }),
  updateLocationHandler,
);

router.delete(
  '/locations/:id',
  authenticate,
  celebrate(idParamSchema),
  deleteLocationHandler,
);

export default router;
