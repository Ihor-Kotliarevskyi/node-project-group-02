import createHttpError from 'http-errors';
import { Location } from '../models/location.js';
import { User } from '../models/user.js';

const POPULATE = [{ path: 'ownerId', select: 'name avatarUrl' }];

export const createLocation = async (data) => {
  const location = await Location.create(data);
  await User.findByIdAndUpdate(data.ownerId, { $inc: { articlesAmount: 1 } });
  return location;
};

export const getAllLocations = async ({
  page = 1,
  limit = 10,
  region,
  locationType,
  search,
  sortBy = 'createdAt',
  order = 'desc',
} = {}) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
  const skip = (pageNum - 1) * limitNum;

  const query = { isPublished: { $ne: false } };
  if (region) query.region = region;
  if (locationType) query.locationType = locationType;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const sort = { [sortBy]: order === 'asc' ? 1 : -1 };

  const [data, total] = await Promise.all([
    Location.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort(sort)
      .populate(POPULATE),
    Location.countDocuments(query),
  ]);

  return {
    data,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
  };
};

export const getLocationById = (id) =>
  Location.findOne({ _id: id, isPublished: { $ne: false } }).populate(POPULATE);

export const updateLocation = async (id, ownerId, updates) => {
  const location = await Location.findById(id);
  if (!location) return null;

  if (location.ownerId.toString() !== ownerId.toString()) {
    throw createHttpError(403, 'Access denied. You are not the author.');
  }

  const allowed = [
    'name',
    'locationType',
    'region',
    'description',
    'image',
    'coordinates',
    'isPublished',
  ];
  allowed.forEach((field) => {
    if (updates[field] !== undefined) location[field] = updates[field];
  });

  await location.save();
  await location.populate(POPULATE);
  return location;
};

export const deleteLocation = async (locationId, userId) => {
  const location = await Location.findById(locationId);
  if (!location) return null;

  if (location.ownerId.toString() !== userId.toString()) {
    throw createHttpError(403, 'Access denied. You are not the author.');
  }

  const deleted = await Location.findByIdAndDelete(locationId);
  if (deleted) {
    await User.findByIdAndUpdate(userId, { $inc: { articlesAmount: -1 } });
  }
  return deleted;
};
