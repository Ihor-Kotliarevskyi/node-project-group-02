import { model, Schema } from 'mongoose';

const regionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Region name is required'],
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export const Region = model('Region', regionSchema);
