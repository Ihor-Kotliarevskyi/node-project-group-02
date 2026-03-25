import createHttpError from 'http-errors';
import {
  locationExists,
  getFeedbacksByLocation,
  createFeedback,
} from '../services/feedbacksService.js';

export const getFeedbacks = async (req, res) => {
  const exists = await locationExists(req.params.locationId);
  if (!exists) throw createHttpError(404, 'Location not found');

  const result = await getFeedbacksByLocation(req.params.locationId, req.query);
  res.status(200).json(result);
};

export const createFeedbackHandler = async (req, res) => {
  const exists = await locationExists(req.params.locationId);
  if (!exists) throw createHttpError(404, 'Location not found');

  const { userName, rate, description } = req.body;

  const feedback = await createFeedback({
    userName,
    rate,
    description,
    author: req.user._id,
    location: req.params.locationId,
  });

  res.status(201).json(feedback);
};
