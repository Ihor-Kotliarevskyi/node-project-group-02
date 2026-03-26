import { model, Schema } from 'mongoose';

const locationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [96, 'Name cannot exceed 96 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [20, 'Description must be at least 20 characters'],
      maxlength: [6000, 'Description cannot exceed 6000 characters'],
    },
    images: {
      type: [String],
      default: [],
    },
    region: {
      type: String,
      required: [true, 'Region is required'],
      maxlength: [64, 'Region cannot exceed 64 characters'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Location type is required'],
      maxlength: [64, 'Type cannot exceed 64 characters'],
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

locationSchema.index({ name: 'text', description: 'text' });
locationSchema.index({ region: 1 });
locationSchema.index({ type: 1 });
locationSchema.index({ author: 1 });

export const Location = model('Location', locationSchema);
