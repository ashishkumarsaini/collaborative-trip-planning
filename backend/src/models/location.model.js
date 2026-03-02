import mongoose from "mongoose";
import {
  LOCATION_ADDRESS_NAME_MAX_LIMIT,
  LOCATION_ADDRESS_NAME_MIN_LIMIT
} from "../validators/index.js";

const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    minlength: LOCATION_ADDRESS_NAME_MIN_LIMIT,
    maxlength: LOCATION_ADDRESS_NAME_MAX_LIMIT,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  }
});

export const Location = mongoose.model('Location', locationSchema);
