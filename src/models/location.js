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
    image: {
      type: String,
      required: [true, 'Main image is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    region: {
      type: String,
      required: [true, 'Region slug is required'],
      trim: true,
    },
    locationType: {
      type: String,
      required: [true, 'Location type is required'],
      trim: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coordinates: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
    rate: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    feedbacksId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Feedback',
      },
    ],
    address: {
      type: String,
      trim: true,
      default: '',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

locationSchema.index({ name: 'text', description: 'text' });
locationSchema.index({ region: 1 });
locationSchema.index({ locationType: 1 });
locationSchema.index({ ownerId: 1 });

export const Location = model('Location', locationSchema);
