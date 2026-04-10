import { Joi, Segments } from 'celebrate';

export const getUsersQuerySchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
    sortBy: Joi.string().valid('name', 'articlesAmount').default('name'),
    order: Joi.string().valid('asc', 'desc').default('asc'),
  }).unknown(false),
};

export const updateProfileSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(32).trim().messages({
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 32 characters',
    }),
    avatarUrl: Joi.string().uri().trim().allow('').messages({
      'string.uri': 'Avatar must be a valid URL',
    }),
  })
    .min(1)
    .unknown(false),
};
