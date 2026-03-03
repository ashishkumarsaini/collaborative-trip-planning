import mongoose from 'mongoose';
import { TRIP_NAME_MIN_LENGTH, TRIP_NAME_MAX_LENGTH } from '../validators/index.js';
import { Activity } from './activity.model.js';

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
    type: Number
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  createdByUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

tripSchema.pre('save', async function (next) {

  console.log('UPDATE IN PROGRESS');

  if (!this.isModified('activities') || !this.isNew) {
    return next();
  }

  if (!this.activities || !this.activities.length) {
    return next();
  }

  const activities = await Activity.find({
    _id: { $in: this.activities }
  });

  if (!activities || !activities.length) {
    return next();
  }

  const sortedActivities = activities.sort((a, b) => a.startDate - b.startDate);
  const startDate = new Date(sortedActivities.at(0).startDate);
  const endDate = new Date(sortedActivities.at(-1).endDate);

  this.numberOfDays = activities.reduce((sum, activity) => {
    return sum + activity.numberOfDays;
  }, 0);
  this.startDate = startDate;
  this.endDate = endDate;
});

export const Trip = mongoose.model('Trip', tripSchema);
