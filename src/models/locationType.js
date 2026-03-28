import { model, Schema } from 'mongoose';

const locationTypeSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, 'Type name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [200, 'Description cannot exceed 200 characters'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const LocationType = model('LocationType', locationTypeSchema);
