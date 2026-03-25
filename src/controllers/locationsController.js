import createHttpError from "http-errors";
import {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
} from "../services/locationsService.js";

const extractImageUrls = (files = []) =>
  files.map((f) => `data:${f.mimetype};base64,${f.buffer.toString("base64")}`);

export const createLocationHandler = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw createHttpError(400, "At least one image is required");
  }

  const images = extractImageUrls(req.files);
  const location = await createLocation({
    ...req.body,
    images,
    author: req.user._id,
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
  const allowedUpdates = ['name', 'description', 'category']; // Please adjust with the actual updatable fields
  const updates = {};
  allowedUpdates.forEach(key => {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) {
      updates[key] = req.body[key];
    }
  });
  if (req.files && req.files.length > 0) {
    updates.images = extractImageUrls(req.files);
  }

  const result = await updateLocation(req.params.id, req.user._id, updates);

  if (!result) throw createHttpError(404, "Location not found");
  if (result.forbidden)
    throw createHttpError(403, "Access denied. You are not the author.");

  res.status(200).json(result);
};
