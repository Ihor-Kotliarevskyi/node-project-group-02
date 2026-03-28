import createHttpError from "http-errors";
import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
} from "../services/locationsService.js";

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
  if (!location) throw createHttpError(404, "Location not found");
  res.status(200).json(location);
};

export const updateLocationHandler = async (req, res) => {
  const allowedUpdates = ['name', 'locationType', 'region', 'description', 'image', 'address', 'coordinates', 'isPublished'];
  const updates = {};
  allowedUpdates.forEach(key => {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) {
      updates[key] = req.body[key];
    }
  });

  const result = await updateLocation(req.params.id, req.user._id, updates);

  if (!result) throw createHttpError(404, "Location not found");
  if (result.forbidden)
    throw createHttpError(403, "Access denied. You are not the author.");

  res.status(200).json(result);
};
