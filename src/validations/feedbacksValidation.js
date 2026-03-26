import { Joi, Segments } from 'celebrate';

export const createFeedbackSchema = {
  [Segments.BODY]: Joi.object({
    userName:    Joi.string().min(2).max(32).required(),
    rate:        Joi.number().integer().min(1).max(5).required(),
    description: Joi.string().min(1).max(200).required(),
  }).unknown(false),
};

export const paginationSchema = {
  [Segments.QUERY]: Joi.object({
    page:  Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
  }),
};
