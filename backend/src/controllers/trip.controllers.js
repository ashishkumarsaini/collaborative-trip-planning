import mongoose from "mongoose";
import { APIError, APIResponse, asyncHandler, RESPONSE_STATUS_CODE } from "../utils/index.js";
import { Trip, User } from "../models/index.js";
import { TRIP_PERMISSION } from "../validators/trip.validators.js";

export const createTrip = asyncHandler(async (req, res) => {
  const tripData = req.body;
  const userId = req.user._id;
  const userEmail = req.user.email;

  const [createdTrip] = await Trip.create(
    [{
      ...tripData,
      createdByUser: userId,
      travellers: [userId],
      addedUsersEmail: [{ _id: userId, email: userEmail, permission: TRIP_PERMISSION.creator }]
    }]
  );

  if (!createdTrip) {
    throw new APIError(RESPONSE_STATUS_CODE.internalServer, "Unable to create trip!");
  }

  const user = await User.findByIdAndUpdate(userId, {
    $push: { bookedTrips: createdTrip._id }
  });

  if (!user) {
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
    }).populate('requestedTraveller').populate('travellers');

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

export const getTripsHavingPermission = asyncHandler(async (req, res) => {
  const userEmail = req.user.email;

  const trips = await Trip.find({ 'addedUsersEmail.email': userEmail });

  if (!trips) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "No trips found!");
  }

  return res.status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Trips found!", { trips }));
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

// TODO: update permission
// export const updateUserPermissionForTrip = asyncHandler(async (req, res) => {
//   const { tripId, permissionId } = req.params;

//   const {email, permission } = req.body;

//   if (!mongoose.isValidObjectId(tripId)) {
//     throw new APIError(RESPONSE_STATUS_CODE.badRequest, "Invalid Trip Id!");
//   }

//   const updatedTrip = await Trip.updateOne(
//     { _id: tripId, 'addedUsersEmail.permission'}
//     {
//       $pull:
//         { addedUsersEmail: { _id: permissionId } }
//     }, { returnDocument: 'after' }
//   );

//   if (!updatedTrip) {
//     throw new APIError(RESPONSE_STATUS_CODE.notFound, "Unable to remove permission!");
//   }

//   return res
//     .status(RESPONSE_STATUS_CODE.ok)
//     .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Permission Removed!", { trip: updatedTrip }));

// });

export const removeUserPermissionForTrip = asyncHandler(async (req, res) => {
  const { tripId, permissionId } = req.params;

  if (!mongoose.isValidObjectId(tripId)) {
    throw new APIError(RESPONSE_STATUS_CODE.badRequest, "Invalid Trip Id!");
  }

  const updatedTrip = await Trip.findByIdAndUpdate(
    tripId,
    {
      $pull:
        { addedUsersEmail: { _id: permissionId } }
    }, { returnDocument: 'after' }
  );

  if (!updatedTrip) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Unable to remove permission!");
  }

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Permission Removed!", { trip: updatedTrip }));

});

export const requestToJoinTrip = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { tripId } = req.params;

  if (!mongoose.isValidObjectId(tripId)) {
    throw new APIError(RESPONSE_STATUS_CODE.badRequest, "Invalid Trip Id!");
  }

  const trip = await Trip.findById(tripId);

  const isUserRequested = trip.requestedTraveller.some((requestedUserId) => requestedUserId.equals(userId));

  if (isUserRequested) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Already requested");
  }

  const isAlreadyAccepted = trip.travellers.some((acceptedUserId) => acceptedUserId.equals(userId));

  if (isAlreadyAccepted) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Request already accepted.");
  }

  const updatedTrip = await Trip.findByIdAndUpdate(
    tripId,
    {
      $push: { requestedTraveller: userId }
    }, { returnDocument: 'after' }
  );

  if (!updatedTrip) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Unable to request join!");
  }

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Request Sent!", { trip: updatedTrip }));
});

// TODO: add mongoose session
export const acceptRequestToJoinTrip = asyncHandler(async (req, res) => {
  const { tripId, userId } = req.params;

  if (!mongoose.isValidObjectId(tripId) || !mongoose.isValidObjectId(userId)) {
    throw new APIError(RESPONSE_STATUS_CODE.badRequest, "Invalid Trip Id!");
  }

  const trip = await Trip.findById(tripId);

  const isUserRequested = trip.requestedTraveller.some((requestedUserId) => requestedUserId.equals(userId));

  if (!isUserRequested) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Please request first.");
  }

  const isAlreadyAccepted = trip.travellers.some((acceptedUserId) => acceptedUserId.equals(userId));

  if (isAlreadyAccepted) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Request already accepted.");
  }

  const updatedTrip = await Trip.findByIdAndUpdate(
    tripId,
    {
      $push: { travellers: userId },
      $pull: { requestedTraveller: userId }
    }, { returnDocument: 'after' }
  );

  if (!updatedTrip) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Unable to accept request!");
  }

  const user = await User.findByIdAndUpdate(userId, {
    $push: { bookedTrips: updatedTrip._id }
  });

  if (!user) {
    throw new APIError(RESPONSE_STATUS_CODE.internalServer, "Unable to create trip!");
  }

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Request Accpeted!", { trip: updatedTrip }));
});
