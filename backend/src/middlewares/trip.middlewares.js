import mongoose from "mongoose";
import { APIError, asyncHandler, RESPONSE_STATUS_CODE } from "../utils/index.js";
import { Trip } from "../models/index.js";
import { TRIP_PERMISSION } from "../validators/trip.validators.js";

export const userAllowedToEditTrip = asyncHandler(async (req, _res, next) => {
  const { tripId } = req.params;
  const userId = req.user._id;
  const userEmail = req.user.email;

  if (!mongoose.isValidObjectId(tripId)) {
    throw new APIError(RESPONSE_STATUS_CODE.badRequest, "Invalid Trip Id!");
  }

  const trip = await Trip.findOne({
    _id: tripId
  });

  if (!trip) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Trip not found!");
  }

  const isCreatedUser = trip.createdByUser.equals(userId);
  const isUserAllowedToUpdate = trip
    .addedUsersEmail
    .find((user) => user.email === userEmail && user.permission === TRIP_PERMISSION.editor);

  if (!isCreatedUser || !isUserAllowedToUpdate) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Unauthorized user for this trip!");
  }

  req.trip = trip;
  next();
});

export const verifyTripCreator = asyncHandler(async (req, _res, next) => {
  const { tripId } = req.params;
  const userId = req.user._id;

  if (!mongoose.isValidObjectId(tripId)) {
    throw new APIError(RESPONSE_STATUS_CODE.badRequest, "Invalid Trip Id!");
  }

  const trip = await Trip.findOne({
    _id: tripId
  });

  if (!trip) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Trip not found!");
  }

  const isCreatedUser = trip.createdByUser.equals(userId);

  if (!isCreatedUser) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Unauthorized user for this trip!");
  }

  req.trip = trip;
  next();
});
