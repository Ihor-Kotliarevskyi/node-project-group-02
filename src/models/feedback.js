import { model, Schema } from 'mongoose';

const feedbackSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, 'User name is required'],
      minlength: [2, 'User name must be at least 2 characters'],
      maxlength: [32, 'User name cannot exceed 32 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [1, 'Description must be at least 1 character'],
      maxlength: [200, 'Description cannot exceed 200 characters'],
    },
    rate: {
      type: Number,
      required: [true, 'Rate is required'],
      min: [1, 'Rate must be at least 1'],
      max: [5, 'Rate cannot exceed 5'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
  },
  { timestamps: true },
);

feedbackSchema.index({ location: 1 });

export const Feedback = model('Feedback', feedbackSchema);
