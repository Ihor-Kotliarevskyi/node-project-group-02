import { Joi, Segments } from 'celebrate';

export const createLocationSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(96).trim().required(),
    locationType: Joi.string().max(64).trim().required(),
    region: Joi.string().max(64).trim().required(),
    description: Joi.string().min(20).max(6000).trim().required(),
    image: Joi.string().uri().required(),
    imagePublicId: Joi.string().max(255).trim().optional(),
    imagePosition: Joi.string().max(32).trim().optional(),
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
    imagePublicId: Joi.string().max(255).trim().allow(null),
    imagePosition: Joi.string().max(32).trim(),
    coordinates: Joi.object({
      lat: Joi.number().min(-90).max(90),
      lon: Joi.number().min(-180).max(180),
    }),
    isPublished: Joi.boolean(),
  })
    .min(1)
    .unknown(false),
};

export const mainPhotoSchema = {
  [Segments.BODY]: Joi.object({
    image: Joi.string().uri().required(),
    imagePublicId: Joi.string().max(255).trim().required(),
    imagePosition: Joi.string().max(32).trim().optional(),
  }),
};

export const idParamSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const photoParamSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required(),
    photoId: Joi.string().hex().length(24).required(),
  }),
};

export const paginationSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
    region: Joi.string().max(64).trim().allow(''),
    locationType: Joi.alternatives()
      .try(
        Joi.array().items(Joi.string().max(64).trim()).min(1),
        Joi.string().max(64).trim().allow(''),
      )
      .optional(),
    search: Joi.string().max(100).trim().allow(''),
    owner: Joi.string().hex().length(24),
    sortBy: Joi.string().valid('createdAt', 'rate', 'name').default('createdAt'),
    order: Joi.string().valid('asc', 'desc').default('desc'),
  }).unknown(false),
};
