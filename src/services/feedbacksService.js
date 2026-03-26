import { Feedback } from '../models/feedback.js';
import { Location } from '../models/location.js';

const POPULATE = [{ path: 'author', select: 'name avatar' }];

export const locationExists = (id) => Location.findById(id);

export const getFeedbacksByLocation = async (locationId, { page = 1, limit = 10 } = {}) => {
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  const query = { location: locationId };

  const [data, total] = await Promise.all([
    Feedback.find(query).skip(skip).limit(limitNum).sort({ createdAt: -1 }).populate(POPULATE),
    Feedback.countDocuments(query),
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

export const createFeedback = (data) =>
  Feedback.create(data).then((f) => f.populate(POPULATE));
