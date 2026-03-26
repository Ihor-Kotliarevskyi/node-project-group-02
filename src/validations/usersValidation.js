import { Joi, Segments } from 'celebrate';

export const updateProfileSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(50),
    bio: Joi.string().allow('').max(500),
    avatar: Joi.string().uri().allow(''),
  }).min(1).unknown(false),
};
