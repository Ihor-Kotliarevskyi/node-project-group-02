import createHttpError from 'http-errors';
import { Location } from '../models/location.js';
import { User } from '../models/user.js';
import { Feedback } from '../models/feedback.js';
import { destroyImage, uploadImage } from '../utils/cloudinary.js';

const MAX_PHOTOS = 10;

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
  owner,
  sortBy = 'createdAt',
  order = 'desc',
} = {}) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
  const skip = (pageNum - 1) * limitNum;

  const query = { isPublished: { $ne: false } };
  if (region) query.region = region;
  if (owner) query.ownerId = owner;
  if (locationType) {
    const types = Array.isArray(locationType) ? locationType : [locationType];
    query.locationType = types.length === 1 ? types[0] : { $in: types };
  }
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
    'imagePublicId',
    'imagePosition',
    'coordinates',
    'isPublished',
  ];

  const previousImagePublicId = location.imagePublicId;
  const nextImagePublicId = updates.imagePublicId;
  const imagePublicIdChanged =
    nextImagePublicId !== undefined && nextImagePublicId !== previousImagePublicId;

  allowed.forEach((field) => {
    if (updates[field] !== undefined) location[field] = updates[field];
  });

  await location.save();

  if (imagePublicIdChanged && previousImagePublicId) {
    await destroyImage(previousImagePublicId);
  }

  await location.populate(POPULATE);
  return location;
};

export const deleteLocation = async (locationId, userId) => {
  const location = await Location.findById(locationId);
  if (!location) return null;

  if (location.ownerId.toString() !== userId.toString()) {
    throw createHttpError(403, 'Access denied. You are not the author.');
  }

  await Feedback.deleteMany({ location: locationId });

  const deleted = await Location.findByIdAndDelete(locationId);
  if (deleted) {
    if (location.imagePublicId) {
      await destroyImage(location.imagePublicId);
    }
    await Promise.all(location.photos.map((p) => destroyImage(p.publicId)));
    await User.findByIdAndUpdate(userId, { $inc: { articlesAmount: -1 } });
  }
  return deleted;
};

export const setMainPhoto = async (locationId, ownerId, { image, imagePublicId, imagePosition }) => {
  const location = await Location.findById(locationId);
  if (!location) throw createHttpError(404, 'Location not found');
  if (location.ownerId.toString() !== ownerId.toString()) {
    throw createHttpError(403, 'Access denied. You are not the author.');
  }

  location.image = image;
  location.imagePublicId = imagePublicId;
  if (imagePosition !== undefined) location.imagePosition = imagePosition;

  await location.save();
  await location.populate(POPULATE);
  return location;
};

export const addPhotos = async (locationId, ownerId, files) => {
  const location = await Location.findById(locationId);
  if (!location) throw createHttpError(404, 'Location not found');
  if (location.ownerId.toString() !== ownerId.toString()) {
    throw createHttpError(403, 'Access denied. You are not the author.');
  }

  const available = MAX_PHOTOS - location.photos.length;
  if (available <= 0) {
    throw createHttpError(
      400,
      `Maximum ${MAX_PHOTOS} additional photos allowed per location`,
    );
  }

  const filesToUpload = files.slice(0, available);
  const uploaded = await Promise.all(
    filesToUpload.map((file) => uploadImage(file.buffer, 'locations/photos')),
  );

  location.photos.push(
    ...uploaded.map((r) => ({ url: r.secure_url, publicId: r.public_id })),
  );
  await location.save();
  await location.populate(POPULATE);
  return location;
};

export const deletePhoto = async (locationId, ownerId, photoId) => {
  const location = await Location.findById(locationId);
  if (!location) throw createHttpError(404, 'Location not found');
  if (location.ownerId.toString() !== ownerId.toString()) {
    throw createHttpError(403, 'Access denied. You are not the author.');
  }

  const photo = location.photos.id(photoId);
  if (!photo) throw createHttpError(404, 'Photo not found');

  const { publicId } = photo;
  photo.deleteOne();
  await location.save();
  await destroyImage(publicId);

  await location.populate(POPULATE);
  return location;
};
