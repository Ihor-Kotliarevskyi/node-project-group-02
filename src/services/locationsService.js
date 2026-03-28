import { Location } from '../models/location.js';

const POPULATE = [
  { path: 'ownerId', select: 'name avatar' },
];

export const createLocation = (data) => Location.create(data);

export const getAllLocations = async ({ page = 1, limit = 10, region, locationType, search } = {}) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
  const skip = (pageNum - 1) * limitNum;

  const query = { isPublished: true };
  if (region) query.region = region;
  if (locationType) query.locationType = locationType;
  if (search) query.$text = { $search: search };

  const sort = search ? { score: { $meta: 'textScore' } } : { createdAt: -1 };

  const [data, total] = await Promise.all([
    Location.find(query).skip(skip).limit(limitNum).sort(sort).populate(POPULATE),
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
  Location.findOne({ _id: id, isPublished: true }).populate(POPULATE);

export const updateLocation = async (id, ownerId, updates) => {
  const location = await Location.findById(id);
  if (!location) return null;

  if (location.ownerId.toString() !== ownerId.toString()) {
    throw new Error('Access denied. You are not the author.');
  }

  const allowed = ['name', 'locationType', 'region', 'description', 'image', 'images', 'address', 'coordinates', 'isPublished'];
  allowed.forEach((field) => {
    if (updates[field] !== undefined) location[field] = updates[field];
  });

  await location.save();
  await location.populate(POPULATE);
  return location;
};
