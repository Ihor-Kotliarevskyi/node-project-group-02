import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  addPhotosHandler,
  createLocationHandler,
  deleteLocationHandler,
  deletePhotoHandler,
  getAllLocationsHandler,
  getLocationByIdHandler,
  setMainPhotoHandler,
  updateLocationHandler,
} from '../controllers/locationsController.js';
import { authenticate } from '../middleware/authenticate.js';
import { uploadImages, handleMulterError } from '../middleware/multer.js';

import {
  createLocationSchema,
  idParamSchema,
  mainPhotoSchema,
  paginationSchema,
  photoParamSchema,
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

router.put(
  '/locations/:id/main-photo',
  authenticate,
  celebrate({ ...idParamSchema, ...mainPhotoSchema }),
  setMainPhotoHandler,
);

router.post(
  '/locations/:id/photos',
  authenticate,
  uploadImages,
  handleMulterError,
  celebrate(idParamSchema),
  addPhotosHandler,
);

router.delete(
  '/locations/:id/photos/:photoId',
  authenticate,
  celebrate(photoParamSchema),
  deletePhotoHandler,
);

export default router;
