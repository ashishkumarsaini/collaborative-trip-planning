import mongoose from "mongoose";
import { APIError, APIResponse, asyncHandler, RESPONSE_STATUS_CODE } from "../utils/index.js";
import { Trip } from "../models/trip.model.js";

export const createTrip = asyncHandler(async (req, res) => {
  const tripData = req.body;
  const userId = req.user._id;

  if (!tripData.activities?.length) {
    throw new APIError(RESPONSE_STATUS_CODE.badRequest, 'No activities found!');
  }
  const isValidActivityIds = tripData.activities.every((activity) => mongoose.isValidObjectId(activity));

  if (!isValidActivityIds) {
    throw new APIError(RESPONSE_STATUS_CODE.badRequest, 'Invalid Activity Id found!');
  }

  const createdTrip = await Trip.create({ ...tripData, createdByUser: userId });

  if (!createdTrip) {
    throw new APIError(RESPONSE_STATUS_CODE.internalServer, "Unable to create trip!");
  }

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Trip Created!", { trip: createdTrip }));

});

export const updateTrip = asyncHandler(async (req, res) => {
  const { tripId } = req.params;

  if (!mongoose.isValidObjectId(tripId)) {
    throw new APIError(RESPONSE_STATUS_CODE.badRequest, "Invalid Trip Id!");
  }

  const tripData = req.body;

  const updatedTrip = await Trip.findByIdAndUpdate(tripId, tripData, { returnDocument: 'after' });

  if (!updatedTrip) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Unable to update trip!");
  }

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Trip updated!", { trip: updatedTrip }));
});

export const deleteTrip = asyncHandler(async (req, res) => {
  const { tripId } = req.params;

  if (!mongoose.isValidObjectId(tripId)) {
    throw new APIError(RESPONSE_STATUS_CODE.badRequest, "Invalid Trip Id!");
  }

  const deletedTrip = await Trip.findByIdAndDelete(tripId);

  if (!deletedTrip) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Unable to delete trip!");
  }

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Trip deleted!"));
});

export const getTrip = asyncHandler(async (req, res) => {
  const { tripId } = req.params;

  if (!mongoose.isValidObjectId(tripId)) {
    throw new APIError(RESPONSE_STATUS_CODE.badRequest, "Invalid Activity Id!");
  }

  const trip = await Trip.findById(tripId);

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Trip found!", { trip }));
});
