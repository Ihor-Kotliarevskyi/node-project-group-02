import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createLocationHandler,
  getAllLocationsHandler,
  getLocationByIdHandler,
  updateLocationHandler,
} from '../controllers/locationsController.js';
import { authenticate } from '../middleware/authenticate.js';
import { uploadImages, handleMulterError } from '../middleware/multer.js';
import {
  createLocationSchema,
  updateLocationSchema,
  paginationSchema,
} from '../validations/locationsValidation.js';

const router = Router();

router.get('/locations', celebrate(paginationSchema), getAllLocationsHandler);

router.post(
  '/locations',
  authenticate,
  uploadImages,
  handleMulterError,
  celebrate(createLocationSchema),
  createLocationHandler,
);

router.get('/locations/:id', getLocationByIdHandler);

router.patch(
  '/locations/:id',
  authenticate,
  uploadImages,
  handleMulterError,
  celebrate(updateLocationSchema),
  updateLocationHandler,
);

export default router;
