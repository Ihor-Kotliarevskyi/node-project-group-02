import { User } from '../models/user.js';
import { Location } from '../models/location.js';

const LOCATION_POPULATE = [
  { path: 'region', select: 'name' },
  { path: 'type', select: 'name' },
  { path: 'author', select: 'name avatar' },
];

export const getUserById = (id) => User.findById(id);

export const updateUser = (id, updates) =>
  User.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true, runValidators: true },
  );

export const getUserLocations = async (
  userId,
  { page = 1, limit = 10 } = {},
) => {
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  const query = { author: userId, isPublished: true };

  const [data, total] = await Promise.all([
    Location.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 })
      .populate(LOCATION_POPULATE),
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
