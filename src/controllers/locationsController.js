import createHttpError from 'http-errors';
import {
  addPhotos,
  createLocation,
  deleteLocation,
  deletePhoto,
  getAllLocations,
  getLocationById,
  setMainPhoto,
  updateLocation,
} from '../services/locationsService.js';

export const createLocationHandler = async (req, res) => {
  const location = await createLocation({
    ...req.body,
    ownerId: req.user._id,
  });
  res.status(201).json(location);
};

export const getAllLocationsHandler = async (req, res) => {
  const result = await getAllLocations(req.query);
  res.status(200).json(result);
};

export const getLocationByIdHandler = async (req, res) => {
  const location = await getLocationById(req.params.id);
  if (!location) throw createHttpError(404, 'Location not found');
  res.status(200).json(location);
};

export const updateLocationHandler = async (req, res) => {
  const allowedUpdates = [
    'name',
    'locationType',
    'region',
    'description',
    'image',
    'imagePublicId',
    'imagePosition',
    'coordinates',
    'isPublished',
  ];
  const updates = {};
  allowedUpdates.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) {
      updates[key] = req.body[key];
    }
  });

  const result = await updateLocation(req.params.id, req.user._id, updates);

  if (!result) throw createHttpError(404, 'Location not found');

  res.status(200).json(result);
};

export const setMainPhotoHandler = async (req, res) => {
  const location = await setMainPhoto(
    req.params.id,
    req.user._id,
    req.body,
  );
  res.status(200).json(location);
};

export const addPhotosHandler = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw createHttpError(400, 'At least one image file is required');
  }
  const location = await addPhotos(req.params.id, req.user._id, req.files);
  res.status(200).json(location);
};

export const deletePhotoHandler = async (req, res) => {
  const location = await deletePhoto(
    req.params.id,
    req.user._id,
    req.params.photoId,
  );
  res.status(200).json(location);
};

export const deleteLocationHandler = async (req, res) => {
  const location = await deleteLocation(req.params.id, req.user._id);

  if (!location) throw createHttpError(404, 'Location not found');

  res.status(204).send();
};
