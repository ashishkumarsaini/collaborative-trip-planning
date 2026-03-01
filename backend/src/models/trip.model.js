import mongoose from 'mongoose';
import { TRIP_NAME_MIN_LENGTH, TRIP_NAME_MAX_LENGTH } from '../validators';

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: TRIP_NAME_MIN_LENGTH,
    maxlength: TRIP_NAME_MAX_LENGTH,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  activities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  numberOfDays: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export const trip = mongoose.model('Trip', tripSchema);
