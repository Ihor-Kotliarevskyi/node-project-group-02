import { Joi, Segments } from 'celebrate';

export const updateProfileSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(32).trim().messages({
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 32 characters',
    }),

    avatar: Joi.string().uri().trim().allow('').messages({
      'string.uri': 'Avatar must be a valid URL',
    }),
  })
    .min(1)
    .unknown(false),
};
