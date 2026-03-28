import { model, Schema } from 'mongoose';

const regionSchema = new Schema(
  {
    region: {
      type: String,
      required: [true, 'Region name is required'],
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
    level: {
      type: String,
      enum: ['регіональне', 'обласне', 'місцеве'],
      default: 'регіональне',
    },
    note: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Region = model('Region', regionSchema);
