import mongoose from "mongoose";
import {
  LOCATION_ADDRESS_NAME_MAX_LIMIT,
  LOCATION_ADDRESS_NAME_MIN_LIMIT,
  LOCATION_NAME_MAX_LIMIT,
  LOCATION_NAME_MIN_LIMIT
} from "../validators";

const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    minlength: LOCATION_NAME_MIN_LIMIT,
    maxlength: LOCATION_NAME_MAX_LIMIT,
    trim: true
  },
  address: {
    required: true,
    minlength: LOCATION_ADDRESS_NAME_MIN_LIMIT,
    maxlength: LOCATION_ADDRESS_NAME_MAX_LIMIT,
    trim: true
  },
  state: {
    required: true,
    trim: true
  },
  country: {
    required: true,
    trim: true
  }
});

export const location = mongoose.model('Location', locationSchema);
