import createHttpError from 'http-errors';
import {
  getUserById,
  updateUser,
  getUserLocations,
} from '../services/usersService.js';

export const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

export const updateMe = async (req, res) => {
  const { name, avatarUrl } = req.body;
  const updated = await updateUser(req.user._id, { name, avatarUrl });
  res.status(200).json(updated);
};

export const getPublicUser = async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  res.status(200).json(user);
};

export const getPublicUserLocations = async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const result = await getUserLocations(req.params.id, req.query);
  res.status(200).json(result);
};
