import mongoose from "mongoose";
import { APIError, asyncHandler, RESPONSE_STATUS_CODE } from "../utils/index.js";
import { Trip } from "../models/index.js";
import { USER_ROLE } from "../validators/user.validators.js";

export const userCreatedTrip = asyncHandler(async (req, _res, next) => {
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

  const isAdmin = req.user.role === USER_ROLE.admin;

  // admin can update any trip
  if (!isAdmin && !trip.createdByUser.equals(userId)) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Unauthorized user for this trip!");
  }

  req.trip = trip;
  next();
});
