import mongoose from "mongoose";
import { APIError, APIResponse, asyncHandler, RESPONSE_STATUS_CODE } from "../utils/index.js";
import { Trip } from "../models/trip.model.js";

export const createTrip = asyncHandler(async (req, res) => {
  const tripData = req.body;
  const userId = req.user._id;

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

  const trip = await Trip.findById(tripId)
    .populate({
      path: 'activities',
      model: 'Activity',
      populate: [
        { path: 'location', model: 'Location' }
      ]
    });

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Trip found!", { trip }));
});

export const getRecommendationTrips = asyncHandler(async (_req, res) => {
  const trips = await Trip.find({});

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Recommendation Trips found!", { trips, total: trips.length }));
});

export const getCreatedTrips = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const trips = await Trip.find({ createdByUser: userId });

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Trips found!", { trips, total: trips.length }));
});

export const getBookedTrips = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user.bookedTrips || !user.bookedTrips.length) {
    return res
      .status(RESPONSE_STATUS_CODE.ok)
      .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Trip found!", { trips: [], total: 0 }));
  }

  const trips = await Trip.find({ '_id': { $in: user.bookedTrips } });

  if (!trips.length) {
    throw new APIError(RESPONSE_STATUS_CODE.internalServer, "Unable to find trips!");
  }
  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Trips found!", { trips, total: trips.length }));
});

export const addUserPermissionForTrip = asyncHandler(async (req, res) => {
  const { tripId } = req.params;

  if (!mongoose.isValidObjectId(tripId)) {
    throw new APIError(RESPONSE_STATUS_CODE.badRequest, "Invalid Trip Id!");
  }

  const { email, permission } = req.body;

  const updatedTrip = await Trip.findByIdAndUpdate(
    tripId,
    {
      $push:
        { addedUsersEmail: { email, permission } }
    }, { returnDocument: 'after' }
  );

  if (!updatedTrip) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Unable to update trip!");
  }

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Permission Added!", { trip: updatedTrip }));

});
