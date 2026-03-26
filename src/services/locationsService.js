import { Location } from '../models/location.js';

const POPULATE = [
  { path: 'region', select: 'name' },
  { path: 'type', select: 'name' },
  { path: 'author', select: 'name avatar' },
];

export const createLocation = (data) => Location.create(data);

export const getAllLocations = async ({ page = 1, limit = 10, region, type, search } = {}) => {
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  const query = { isPublished: true };
  if (region) query.region = region;
  if (type) query.type = type;
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

export const updateLocation = async (id, authorId, updates) => {
  const location = await Location.findById(id);
  if (!location) return null;

  if (location.author.toString() !== authorId.toString()) {
    return { forbidden: true };
  }

  const allowed = ['title', 'description', 'images', 'region', 'type', 'address', 'coordinates', 'isPublished'];
  allowed.forEach((field) => {
    if (updates[field] !== undefined) location[field] = updates[field];
  });

  await location.save();
  await location.populate(POPULATE);
  return location;
};
