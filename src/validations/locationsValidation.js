import { Joi, Segments } from "celebrate";

export const createLocationSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(96).required(),
    type: Joi.string().max(64).required(),
    region: Joi.string().max(64).required(),
    description: Joi.string().min(20).max(6000).required(),
    address: Joi.string().allow("").optional(),
    coordinates: Joi.object({
      lat: Joi.number(),
      lng: Joi.number(),
    }).optional(),
  }),
};

export const updateLocationSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(96),
    type: Joi.string().max(64),
    region: Joi.string().max(64),
    description: Joi.string().min(20).max(6000),
    address: Joi.string().allow(""),
    coordinates: Joi.object({
      lat: Joi.number(),
      lng: Joi.number(),
    }),
    isPublished: Joi.boolean(),
  }).min(1),
};

export const paginationSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(50).default(10),
    region: Joi.string().max(64),
    type: Joi.string().max(64),
    search: Joi.string().max(100),
  }),
};
