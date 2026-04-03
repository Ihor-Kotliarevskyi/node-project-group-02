import { Joi, Segments } from 'celebrate';

export const createLocationSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(96).trim().required(),
    locationType: Joi.string().max(64).trim().required(),
    region: Joi.string().max(64).trim().required(),
    description: Joi.string().min(20).max(6000).trim().required(),
    image: Joi.string().uri().required(),
    coordinates: Joi.object({
      lat: Joi.number().min(-90).max(90).required(),
      lon: Joi.number().min(-180).max(180).required(),
    }).required(),
  }).unknown(false),
};

export const updateLocationSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(96).trim(),
    locationType: Joi.string().max(64).trim(),
    region: Joi.string().max(64).trim(),
    description: Joi.string().min(20).max(6000).trim(),
    image: Joi.string().uri(),
    coordinates: Joi.object({
      lat: Joi.number().min(-90).max(90),
      lon: Joi.number().min(-180).max(180),
    }),
    isPublished: Joi.boolean(),
  })
    .min(1)
    .unknown(false),
};

export const idParamSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const paginationSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
    region: Joi.string().max(64).trim().allow(''),
    locationType: Joi.string().max(64).trim().allow(''),
    search: Joi.string().max(100).trim().allow(''),
  }).unknown(false),
};
