import { model, Schema } from 'mongoose';

const locationTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Type name is required'],
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const LocationType = model('LocationType', locationTypeSchema);
