import mongoose from "mongoose";
import {
  ACTIVITY_NAME_MIN_LENGTH,
  ACTIVITY_NAME_MAX_LENGTH,
  ACTIVITY_DESCRIPTION_MIN_LENGTH,
  ACTIVITY_DESCRIPTION_MAX_LENGTH
} from "../validators/index.js";

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: ACTIVITY_NAME_MIN_LENGTH,
    maxlength: ACTIVITY_NAME_MAX_LENGTH,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: ACTIVITY_DESCRIPTION_MIN_LENGTH,
    maxlength: ACTIVITY_DESCRIPTION_MAX_LENGTH,
    trim: true
  },
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
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  order: {
    type: Number,
    required: true
  }
});

activitySchema.pre('save', function (next) {
  if (this.isModified(this.startDate) || this.isModified(this.numberOfDays)) {
    const newDate = new Date(this.startDate);
    newDate.setDate(newDate.getDate() + this.numberOfDays);
    this.endDate = newDate;
    return;
  }

  next();
});

export const activity = mongoose.model('Activity', activitySchema);
